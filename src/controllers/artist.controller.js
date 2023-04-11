const ArtistCollection = require('../models/artist.model');
const { v4, validate } = require('uuid');

var exports = module.exports = {};

exports.getAllArtists = async function (req, res) {
    try {
        const artistList = await ArtistCollection.find()
        if (artistList.length === 0) {
            return res.status(200).json({message: 'Artist Collection Is Empty'});
        }
        res.status(200).json({message: 'Fetched Artist List Successfully', data: artistList})
    }
    catch(err) {
        res.json({message: `Error While Fetching Artist List: ${err.message}`})
    }
}

exports.getArtistWithId = async function (req, res) {
    var id = req.params.id;
    if (!id || !validate(id)) {
        return res.status(400).json({message: 'Provide Valid ID'})
    }
    try {
        const artist = await ArtistCollection.findById({id : req.params.id})
        res.status(200).json({message: 'Artist Found', data: artist})
    }
    catch (err) {
        res.status(404).json({message: `No Artist Found With ID: ${err.message}`})
    }
}
exports.postArtist = async function (req, res) {
    if (!req.body.name || !req.body.grammy) {
        return res.status(400).json({message: 'Enter Name and Grammy'})
    }
    try {
        var newArtist = new ArtistCollection({
            id: v4(),
            name: req.body.name,
            grammy: req.body.grammy
        })

        newArtist = await newArtist.save();
        res.status(201).json({message: 'New Artist Added', data: newArtist})
    }
    catch(err) {
        res.status(500).json({message: `Error While Adding New User ${err.message}`})
    }  
}
exports.updateArtistWithId = async function (req, res) {
    var id = req.params.id;
    if (!id || !validate(id)) {
        return res.status(400).json({message: 'Provide Valid ID'})
    }
    try {
        const updatedArtist = await ArtistCollection.findByIdAndUpdate({id}, req.body)
        res.status(200).json({message: 'Updated User Details', data: updatedArtist})

    }
    catch (err) {
        res.status(404).json({message: `Artist doesn't exist: ${err.message}`})
    }
}
exports.deleteArtistWithId = async function (req, res) {
    var id = req.params.id;
    if (!id || !validate(id)) {
        return res.status(400).json({message: 'Provide Valid ID'})
    }
    try {
        await ArtistCollection.findByIdAndRemove({id})
        res.status(204).json({message: 'Updated User Details'})
    }
    catch (err) {
        res.status(404).json({message: `No Artist Found With ID: ${id}`})
    }
}
