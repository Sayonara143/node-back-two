import { userModel } from '../../models/userModel'
import { postModel } from '../../models/postModel'
import { commentModel } from '../../models/commentModel'
import fs from 'fs'
import {nanoid} from 'nanoid'

const processUpload = async (id, file)=>{
  const {createReadStream, mimetype, encoding, filename} = await file;
  let pathLink = "avatar/"+ nanoid() + filename;
  let path = "uploads/" + String(pathLink)
  let stream = createReadStream();
  // return new Promise(()=>{
      stream
      .pipe(fs.createWriteStream(path))
      .on("finish", async()=>{
        return await userModel.updateOne({_id:id},{path: pathLink})
      })
      .on("error", (err)=>{
          console.log("Error Event Emitted")
          console.log(err)
          return err
      })
  // })
}

module.exports = {
  addUser: async (_, args) => {
    try {
      console.log('addUser')
      const newUser = {
        name: args.name,
        surname: args.surname,
        email: args.email,
        path: ''
      }
      let response = await userModel.create(newUser)
      await processUpload(response._id, args.file)
      return response
    } catch(e) {
      console.log(e)
      return e.message;
    }
  },
  deleteUser: async (_, {id, userId}) => {
    try {
      console.log('deleteUser')
      if (userId === id){
        let user = await userModel.findById(id)
        if (!user) {
          return null
        }
        user.posts.forEach(async postId => {
          let post = await postModel.findById({_id: postId})
          post.comments.forEach(async id => {
            await commentModel.deleteOne({_id: id})
          }) 
        })
        user.comments.forEach(async commentId => {
            await commentModel.deleteOne({_id: commentId})
        })
        if (user.path !== "") {
          fs.unlink(String("uploads/"+user.path), (err)=>{
            if(err) console.log(err)
          })
        }
        await postModel.deleteMany({author: id})
        await userModel.deleteOne({_id: id})
        return user
      }
    } catch(e) {
      console.log(e)
      return e.message
    }
  },
  updateUser: async (_, args) => {
    try {
      console.log('updateUser')
      if(args.id !== args.userId){
        return null
      }
      let user = await userModel.findById(args.id)
      if (!user){
        return null
      }
      if (args.file){
        fs.unlink(String("uploads/"+user.path), (err)=>{
          if(err) console.log(err)
        })
        await processUpload(user.id, args.file)
      }
      const newArgs = {
        name: (args.name) ? args.name : user.name,
        surname: (args.surname) ? args.surname : user.surname,
        email: (args.email) ? args.email : user.email,
      }
      await userModel.updateOne({_id: args.id}, newArgs, {multi: true}, async (err) => {
        if (err){ 
          console.log(err)
          return null
        }
      })
      return  await userModel.findById(args.id)
    } catch (e) {
      console.log(e)
      return e.message
    }
  }
}