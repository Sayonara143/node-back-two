import mongoose from 'mongoose'
import {userModel} from './userModel'
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'userModel',
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'postModel',
  },
  parent: {
    type: Schema.Types.ObjectId,
  },
  text: String,
  date: Number,
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'commentModel',
  }]
});

commentSchema.pre('deleteOne', async function(next){
  try {
    let comment = await commentModel.findById(this._conditions._id)
    console.log(comment)
    await userModel.updateOne({_id: comment.author}, {$pull: {comments: comment._id}})
    comment.answers.forEach(async answer => {
      let authorId = (await commentModel.findOne({_id: answer})).author
      await commentModel.deleteOne({_id: answer})
      await userModel.updateOne({_id: authorId}, {$pull: {comments: answer}})
    }) 
    next()
  } catch (e) {
    console.log(e)
    next()
  }
})

// commentSchema.pre('deleteMany', async function(next){
//   try {
//     console.log(this._conditions)
//     let comments = await commentModel.find({parent: mongoose.Types.ObjectId(this._conditions.parent)})
//     comments.forEach(async comment => {  
//       console.log(comment) 
//       await commentModel.deleteOne({_id: mongoose.Types.ObjectId(comment._id)})
//     }) 
//     next()
//   } catch (e) {
//     console.log(e)
//     next()
//   }
  
// })


const commentModel = mongoose.model('commentModel', commentSchema); 

export {
  commentModel
}