const cloudinary = require("../middleware/cloudinary")
const Post = require("../models/PostModel");
const Profile=require('../models/ProfileModel')

module.exports = {
 
  createPost: async (req, res) => {
    try {
        console.log('hi')
        console.log(req.body)
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      const post= await Post.create({
        body: req.body.body,
        ImageURL: result.secure_url,
        cloudinaryId: result.public_id,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.status(200).json(post)
    } catch (err) {
      console.log(err);
    }
  },
  getPosts: async (req, res) => {
    try {
        console.log('hi')
        const posts = await Post.find();
        if (!posts) {
          return res.status(404).json({ error: 'No posts found' });
        }
    
        res.status(200).json(posts); // Send the retrieved posts as a JSON response
    //     console.log(req.body)
    //   // Upload image to cloudinary
    //   const result = await cloudinary.uploader.upload(req.file.path);

    //   const post= await Post.create({
    //     body: req.body.body,
    //     ImageURL: result.secure_url,
    //     cloudinaryId: result.public_id,
    //     user: req.user.id,
    //   });
    //   console.log("Post has been added!");
    //   res.status(200).json(post)
     } catch (err) {
       console.log(err);
     }
  },
  editShortBio: async (req, res) => {
    try {
      const userId = req.user.id;
      const newShortBio = req.body.shortBio;
  
      // Attempt to find the profile for the user
      let updatedProfile = await Profile.findOne({ user: userId });
  
      if (!updatedProfile) {
        // If no profile exists, create a new one
        updatedProfile = new Profile({
          user: userId,
          shortBio: newShortBio,
          // Add other profile properties here
        });
  
        await updatedProfile.save();
      } else {
        // Update the shortBio field if the profile exists
        updatedProfile.shortBio = newShortBio;
        await updatedProfile.save();
      }
  
      res.status(200).json(updatedProfile);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Server error' });
    }},

    getShortBio: async (req, res) => {
      try {
          console.log('hi')
          const profile = await Profile.findOne({ user: req.user.id }); // Assuming the user's ID is stored in the 'user' field
          if (!profile) {
            return res.status(404).json({ error: 'No profile found' });
          }
      
          res.status(200).json(profile); // Send the retrieved posts as a JSON response
      
       } catch (err) {
         console.log(err);
       }
    },
 

};