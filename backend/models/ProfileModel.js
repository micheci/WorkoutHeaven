const mongoose = require('mongoose')


const Schema = mongoose.Schema

const profileSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
  },
  shortBio: {
    type: String,
    require: false,
  },
  longBio: {
    type: String,
    required: false
  },
  profilePic: {
    type: String,
    required: false
  },
 
}, { timestamps: true })

module.exports = mongoose.model('Profile', profileSchema)