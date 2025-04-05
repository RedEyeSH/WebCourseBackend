import express from 'express';
import { getCat, getCatById, postCat, putCat, deleteCat, getCatByOwnerId } from '../controllers/cat-controller.js';
import createThumbnail from '../../middlewares.js';
import multer from 'multer';

const catRouter = express.Router();

const upload = multer({dest: 'uploads/'});

catRouter.route('/').get(getCat).post(upload.single('image'), createThumbnail, postCat);

catRouter.route('/:id').get(getCatById).put(putCat).delete(deleteCat);

catRouter.route('/owner/:id').get(getCatByOwnerId);

export default catRouter;

