import { uploadFile, getPresignedUrl } from "../services/storage.services.js";
import musicModel from "../models/music.model.js";

export async function uploadMusic(req, res) {

    const musicFile = req.files[ 'music' ][ 0 ];
    const coverImageFile = req.files[ 'coverImage' ][ 0 ];


    try {

        const musicKey = await uploadFile(musicFile);
        const coverImageKey = await uploadFile(coverImageFile);

        const music = await musicModel.create({
            title: req.body.title,
            artist: req.user.fullname.firstName + " " + req.user.fullname.lastName,
            artistId: req.user.id,
            musicKey,
            coverImageKey
        })

        return res.status(201).json({ message: 'Music uploaded successfully', music });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' });
    }

}

export async function getArtistMusic(req, res){
    try{
        const musicDocs = await musicModel.find({artistId: req.user.id}).lean();

        const musics = [];

        for(let music of musicDocs){
            music.musicUrl = await getPresignedUrl(music.musicKey)
            music.coverImage = await getPresignedUrl(music.coverImageKey);
            musics.push(music);
        }

        return res.status(201).json({musics})
    }
    catch(err){
        console.log(err);
    }
}