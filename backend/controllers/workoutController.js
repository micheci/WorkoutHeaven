const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({ user: req.user.id })

  res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such workout'})
  }

  const workout = await Workout.findById(id)

  if (!workout) {
    return res.status(404).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res) => {
  const {exercise_name, videoURL, steps,Category} = req.body
  

  // add to the database
  try {
    const workout = await Workout.create({ exercise_name, videoURL, steps,Category,user: req.user.id,})
    res.status(200).json(workout)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }
  const workout = await Workout.findById(req.params.id)
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }
  
  // Make sure the logged in user matches the goal user
  if (workout.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')}

  

  const newworkout = await Workout.findOneAndDelete(req.params.id, req.body, {
   ...req.body
  })

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(newworkout)
}

// update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }
  const workout = await Workout.findById(req.params.id)
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }
  
  // Make sure the logged in user matches the goal user
  if (workout.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')}

  

  const newworkout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
   ...req.body
  })

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(newworkout)
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}