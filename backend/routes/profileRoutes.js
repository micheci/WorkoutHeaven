const express=require('express')
const router=express.Router()
const upload = require("../middleware/multer");
const {createPost}=require('../controllers/profileController')
const {protect} =require('../middleware/authMiddleware')


router.post('/createPost',protect,upload.single("file"),createPost)


module.exports = router