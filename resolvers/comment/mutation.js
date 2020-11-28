import { userModel } from '../../models/userModel'
import { postModel } from '../../models/postModel'
import { commentModel } from '../../models/commentModel'

module.exports ={
  addComment: async (_, args) => {
    try {
      console.log('addComment')
      let user = await userModel.findById(args.author)
      let post = await postModel.findById(args.post)
      if(!user || !post){
        return null
      }
      let response = await commentModel.create(args)
      await postModel.updateOne({_id: args.post},{$push: {comments: response}})
      await userModel.updateOne({_id: args.author}, {$push: {comments: response}})
      return response
    } catch(e) {
      console.log(e)
      return e.message
    }
  },
  addAnswer: async (_, args) => {
    try {
      console.log('addAnswer')
      let user = await userModel.findById(args.author)
      let comment = await commentModel.findById(args.post)
      if(!user || !comment){
        return null
      }
      let response = await commentModel.create(args)
      await commentModel.updateOne({_id: args.post},{$push: {answers: response}})
      await userModel.updateOne({_id: args.author}, {$push: {comments: response}})
      return response
    } catch(e) {
      console.log(e)
      return e.message
    }
  },
  deleteComment: async (_, {id, userId}) => {
    try {
      console.log('deleteComment')
      let comment = await commentModel.findOne({_id: id})
      if(!comment){
        return null 
      }
      if (userId == comment.author) {
        console.log('comment.author')
        let post = await postModel.findOne({_id: comment.post})
        for (let i = 0; i < comment.answers.length; i++) {
          let commentId = comment.answers[i];
          await userModel.updateOne({comments: commentId}, {$pull: {comments: commentId}})
          
        }
        await userModel.updateOne({_id: userId}, {$pull: {comments: id}})
        if(!post){
          await commentModel.updateOne({_id: comment.post}, {$pull: {answers: id}})
        } else {
          await postModel.updateOne({_id: post._id}, {$pull: {comments: id}})
        }
        await commentModel.deleteOne({_id: id})
        return comment
      }
      if (userId == post.author) {
        console.log('post.author')
        let comment = commentModel.findOne({post: post._id})
        for (let i = 0; i < comment.answers.length; i++) {
          let commentId = comments.answers[i];
          await userModel.updateOne({comments: commentId}, {$pull: {comments: commentId}})
          
        }
        await userModel.updateOne({comments: id}, {$pull: {comments: id}})
        await postModel.updateOne({_id: post._id}, {$pull: {comments: id}})
        await commentModel.deleteMany({post: id})
        await commentModel.deleteOne({_id: id})
        return comment
      }
    } catch(e) {
      console.log(e)
      return e.message
    }
  },
  updateComment: async (_, args) => {
    try {
      console.log('updateComment')
      let comment = await commentModel.findById(args.id)
      if (!comment){
        return null
      }
      if(String(comment.author) !== args.userId){
        return null
      }
      const newArgs = {
        text: (args.text) ? args.text : comment.text,
      }
      await commentModel.updateOne({_id: args.id}, newArgs, {multi: true}, async (err) => {
        if (err){ 
          console.log(err)
          return null
        }
      })
      return  await commentModel.findById(args.id)
    } catch (e) {
      console.log(e)
      return e.message
    }
  }
}