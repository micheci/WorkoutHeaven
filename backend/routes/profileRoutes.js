const express=require('express')
const router=express.Router()
const upload = require("../middleware/multer");
const {createPost,getPosts}=require('../controllers/profileController')
const {protect} =require('../middleware/authMiddleware')


router.post('/createPost',protect,upload.single("file"),createPost)
router.get('/getPosts',protect,getPosts)



module.exports = router