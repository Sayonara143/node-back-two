import { userModel } from '../../models/userModel'
import { postModel } from '../../models/postModel'
import { commentModel } from '../../models/commentModel'
import DataLoader from 'dataloader'

module.exports = { 
  answers: async (parent, _, context, info) => {
    try{
      const {dataloaders} = context
      let dl = dataloaders.get(info.fieldNodes);
      if (!dl){
        dl = new DataLoader( async (id) => {
          console.log('commentsLoader')
          let comments = await commentModel.find({post: id})
          let commentsGrouped = id.map ( userId => {
            return comments.filter( comment => comment.post == userId )
          })
          return commentsGrouped
        })
        dataloaders.set(info.fieldNodes, dl)
      }
      return await dl.load(parent.id)
    } catch(e)
    {
      console.log(e)
      return e.message
    }
  },
  author: async (parent) => {
    try{
      return await userModel.findOne({comments: {_id: parent.id}})
    } catch(e)
    {
      return e.message
    }
  },
  post: async (parent) => {
    try{
      // если комментарий к посту
      let post = await postModel.findOne({comments: {_id: parent.id}})
      if (!post){
        // если комментарий вложенный(=> комментарий к комментарию)
        post = await commentModel.findOne({_id: parent.id})
        post._id = post.post
      }
      return post
    } catch(e){
      return e.message
    }
  }  
}