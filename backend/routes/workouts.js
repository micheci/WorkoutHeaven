const express = require('express')
const {
  getWorkouts, 
  getWorkout, 
  createWorkout, 
  deleteWorkout, 
  updateWorkout
} = require('../controllers/workoutController')
const {protect}=require('../middleware/authMiddleware')

const router = express.Router()

// GET all workouts
router.get('/',protect, getWorkouts)

// GET a single workout
router.get('/:id', getWorkout)

// POST a new workout
router.post('/',protect, createWorkout)

// DELETE a workout
router.delete('/:id',protect, deleteWorkout)

// UPDATE a workout
router.patch('/:id',protect, updateWorkout)

module.exports = router