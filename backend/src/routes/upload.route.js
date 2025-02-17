import express from 'express';
import multer from 'multer';
import cors from 'cors'
import cloudinary from '../lib/cloudinary.js';


const router = express();
router.use(cors());

const Storage = multer.diskStorage({});
const upload = multer({storage:Storage});
router.post('/upload_image', upload.single('image') , async(req,res,next)=>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'uploads'});
        res.status(200).json({image_url:result.secure_url})
    } catch (error) {
        console.log(error)
    }
})

export default router;