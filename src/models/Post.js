import { model, Schema } from 'mongoose';

const Post = new Schema({
  body: String,
  username: String,
  createdAt: String,
  comments: [{ body: String, username: String, createdAt: String }],
  likes: [{ username: String, createdAt: String }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

export default model('Post', Post);
