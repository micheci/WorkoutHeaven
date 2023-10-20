const express=require('express')
const router=express.Router()
const upload = require("../middleware/multer");
const {createPost,getPosts, editShortBio,getShortBio}=require('../controllers/profileController')
const {protect} =require('../middleware/authMiddleware')


router.post('/createPost',protect,upload.single("file"),createPost)
router.get('/getPosts',protect,getPosts)
router.put('/editShortBio',protect,editShortBio)
router.get('/getShortBio',protect,getShortBio)




module.exports = router