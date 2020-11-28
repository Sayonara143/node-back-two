import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const userSchema  = new Schema({
  name: String,
  surname: String,
  email: String,
  path: String,
  posts: [{    
    type: Schema.Types.ObjectId,
    ref: 'postModel',
  }],
  comments: [{    
    type: Schema.Types.ObjectId,
    ref: 'commentModel',
  }]
});

const userModel = mongoose.model('userModel', userSchema); 

export {
  userModel
}