import { userModel } from '../../models/userModel'
import { postModel } from '../../models/postModel'
import { commentModel } from '../../models/commentModel'

module.exports = {
  addPost: async (_, args) => {
    try {
      console.log('addPost')
      let user = await userModel.findById(args.author)
      if(!user){ 
        console.log(user)
        return null
      }
      let response = await postModel.create(args)
      await userModel.updateOne({_id: args.author},{ $push: {posts: response}})
      return response;
    } catch(e) {
      console.log(e)
      return e.message
    }
  },
  deletePost: async (_, {id, userId}) => {
    try {
      console.log('deletePost')
      let post = await postModel.findById(id)
      if (!post){
        return null
      }
      if (post.author == userId){
        await userModel.updateOne({_id: userId}, {$pull: {posts: id}})
        let comments = await commentModel.find({parent: id})
        comments.forEach(async comment => {
          await userModel.updateOne({_id: comment.author}, {$pull: {comments: comment._id}})
        })
        await commentModel.deleteMany({parent: id})
        await postModel.deleteOne({_id: id})
        return post
      }
      
    } catch(e) {
      console.log(e)
      return e.message
    }
  },
  updatePost: async (_, args) => {
    try {
      console.log('updatePost')
      let post = await postModel.findById(args.id)
      if (!post){
        return null
      }
      if(String(post.author) !== args.userId){
        console.log(post.author)
        return null
        
      }
      const newArgs = {
        title: (args.title) ? args.title : post.title,
        text: (args.text) ? args.text : post.text,
      }
      await postModel.updateOne({_id: args.id}, newArgs, {multi: true}, async (err) => {
        if (err){ 
          console.log(err)
          return null
        }
      })
      return  await postModel.findById(args.id)
    } catch (e) {
      console.log(e)
      return e.message
    }
  }
}