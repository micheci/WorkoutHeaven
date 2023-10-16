const mongoose = require('mongoose')


const Schema = mongoose.Schema

const postSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    required: true
  },
  ImageURL: {
    type: String,
    required: true
  },
 
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)