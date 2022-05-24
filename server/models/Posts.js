const mongoose = require('mongoose');

const { Schema } = mongoose;

const postsSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type:String
  },
  link: {
    type: String
  },
  image: {
    type: String
  }
});

const Posts = mongoose.model('Posts', postsSchema);

module.exports = Posts;

