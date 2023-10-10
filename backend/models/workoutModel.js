const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workoutSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
  },
  exercise_name: {
    type: String,
    required: true
  },
  videoURL: {
    type: String,
    required: true
  },
  steps:{
    type:String,
    required:true
  },
  Category: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)