import { Router } from "express";
import auth from "../middleware/auth.js";
import uploadImageController from "../controllers/uploadImageController.js";
import upload from "../middleware/multer.js";

const uploadRouter = new Router();

uploadRouter.post('/upload',auth,upload.single('image'),uploadImageController)

export default uploadRouter;