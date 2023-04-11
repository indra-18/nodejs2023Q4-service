const AlbumCollection = require('../models/album.model');
const { v4, validate } = require('uuid');

var exports = module.exports = {};

exports.getAllAlbums = async function (req, res) {
    try {
        const albumList = await AlbumCollection.find()
        if (albumList.length === 0) {
            return res.status(200).json({message: 'Album Collection Is Empty'});
        }
        res.status(200).json({message: 'Fetched Album List Successfully', data: albumList})
    }
    catch(err) {
        res.json({message: `Error While Fetching Album List: ${err.message}`})
    }
}

exports.getAlbumWithId = async function (req, res) {
    var id = req.params.id;
    if (!id || !validate(id)) {
        return res.status(400).json({message: 'Provide Valid ID'})
    }
    try {
        const album = await AlbumCollection.findById({id : req.params.id})
        res.status(200).json({message: 'Album Found', data: album})
    }
    catch (err) {
        res.status(404).json({message: `No Album Found With ID: ${err.message}`})
    }
}
exports.postAlbum = async function (req, res) {
    if (!req.body.name || !req.body.year || !req.body.year) {
        return res.status(400).json({message: 'Enter Name, Year and ArtistID'})
    }
    try {
        var newAlbum = new AlbumCollection
    ({
            id: v4(),
            name: req.body.name,
            year: req.body.year,
            artistId: req.body.artistId
        })

        newAlbum = await newAlbum.save();
        res.status(201).json({message: 'New Album Added', data: newAlbum})
    }
    catch(err) {
        res.status(500).json({message: `Error While Adding New Album ${err.message}`})
    }  
}
exports.updateAlbumWithId = async function (req, res) {
    var id = req.params.id;
    if (!id || !validate(id)) {
        return res.status(400).json({message: 'Provide Valid ID'})
    }
    try {
        const updatedAlbum = await AlbumCollection
    .findByIdAndUpdate({id}, req.body)
        res.status(200).json({message: 'Updated Album Details', data: updatedAlbum})

    }
    catch (err) {
        res.status(404).json({message: `Album doesn't exist: ${err.message}`})
    }
}
exports.deleteAlbumWithId = async function (req, res) {
    var id = req.params.id;
    if (!id || !validate(id)) {
        return res.status(400).json({message: 'Provide Valid ID'})
    }
    try {
        await AlbumCollection
    .findByIdAndRemove({id})
        res.status(204).json({message: 'Deleted Album'})
    }
    catch (err) {
        res.status(404).json({message: `No Album Found With ID: ${id}`})
    }
}
