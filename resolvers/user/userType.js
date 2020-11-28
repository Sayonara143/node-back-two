import { postModel } from '../../models/postModel'
import { commentModel } from '../../models/commentModel'
import DataLoader from 'dataloader'

module.exports = { 
  posts: async (parent, _, context, info) => {
    try{
      const {dataloaders} = context
      let dl = dataloaders.get(info.fieldNodes);
      if (!dl){
        dl = new DataLoader( async (id) => {
          console.log('postsLoader')
          let posts = await postModel.find({author: id})
          let postsGrouped = id.map ( userId => {
            return posts.filter( post => post.author._id == userId );
          });
          return postsGrouped
        })
        dataloaders.set(info.fieldNodes, dl);
      }
      return await dl.load(parent.id)
    } catch(e)
    {
      console.log(e)
      return e.message
    }
  },
  comments: async (parent, _, context, info) => {
    try{
      const {dataloaders} = context
      let dl = dataloaders.get(info.fieldNodes);
      if (!dl){
        dl = new DataLoader( async (id) => {
          console.log('userModelLoader:::Comments')
          let comments = await commentModel.find({author: id})
          let commentsGrouped = id.map ( key => {
            return comments.filter( comment => comment.author == key )
          })
          return commentsGrouped
        })
        dataloaders.set(info.fieldNodes, dl);
      }
      return await dl.load(parent.id)
    } catch(e)
    {
      console.log(e)
      return e.message
    }
  }
}