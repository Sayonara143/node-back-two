import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'userModel',
  },
  title: String,
  text: String,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'commentModel',
  }],
  date: Date
});

const postModel = mongoose.model('postModel', postSchema); 

export {
  postModel
}