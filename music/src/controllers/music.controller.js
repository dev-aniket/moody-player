import { uploadFile, getPresignedUrl } from "../services/storage.services.js";
import musicModel from "../models/music.model.js";
import playlistModel from "../models/playlist.model.js";

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

export async function getArtistMusics(req, res) {
    try {
        const musicsDocs = await musicModel.find({ artistId: req.user.id }).lean();

        const musics = [];

        for (let music of musicsDocs) {
            music.musicUrl = await getPresignedUrl(music.musicKey);
            music.coverImageUrl = await getPresignedUrl(music.coverImageKey);
            musics.push(music);
        }

        return res.status(200).json({ musics });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export async function createPlaylist(req, res) {
    const { title, musics } = req.body;

    try {
        const playlist = await playlistModel.create({
            artist: req.user.fullname.firstName + " " + req.user.fullname.lastName,
            artistId: req.user.id,
            title,
            userId: req.user.id,
            musics
        })

        return res.status(201).json({ message: 'Playlist created successfully', playlist });

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' });
    }
}


export async function getPlaylists(req, res) {
    try {
        const playlists = await playlistModel.find({ artistId: req.user.id })
        return res.status(200).json({ playlists });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}