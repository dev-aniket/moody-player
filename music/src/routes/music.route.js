import express from 'express';
import multer from 'multer';
import * as musicController from '../controllers/music.controller.js';
import * as authMiddleware from '../middlewares/auth.middleware.js'

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage()
});

// POST /api/music/upload 
router.post('/upload', authMiddleware.artistMiddleware, upload.fields([
    {name:"music", maxCount:1},
    {name:"coverImage", maxCount:1},
]), musicController.uploadMusic)


router.get('/artist-musics', authMiddleware.artistMiddleware, musicController.getArtistMusic)

export default router;
