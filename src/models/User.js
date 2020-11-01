import { model, Schema } from 'mongoose';

const User = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

export default model('User', User);
