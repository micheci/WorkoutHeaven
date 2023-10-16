const cloudinary = require("../middleware/cloudinary")
const Post = require("../models/PostModel");

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
 

};