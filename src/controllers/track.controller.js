const TrackCollection = require('../models/track.model');
const { v4, validate } = require('uuid');

var exports = module.exports = {};

exports.getAllTracks = async function (req, res) {
    try {
        const trackList = await TrackCollection.find()
        if (trackList.length === 0) {
            return res.status(200).json({message: 'Tracks Collection Is Empty'});
        }
        res.status(200).json({message: 'Fetched Track List Successfully', data: trackList})
    }
    catch(err) {
        res.json({message: `Error While Fetching Track List: ${err.message}`})
    }
}

exports.getTrackWithId = async function (req, res) {
    var id = req.params.id;
    if (!id || !validate(id)) {
        return res.status(400).json({message: 'Provide Valid ID'})
    }
    try {
        const track = await TrackCollection.findById({id : req.params.id})
        res.status(200).json({message: 'Track Found', data: track})
    }
    catch (err) {
        res.status(404).json({message: `No Track Found With ID: ${err.message}`})
    }
}
exports.postTrack = async function (req, res) {
    if (!req.body.name || !req.body.artistId || !req.body.albumId || !req.body.duration) {
        return res.status(400).json({message: 'Enter Name and Grammy'})
    }
    try {
        var newTrack = new TrackCollection({
            id: v4(),
            name: req.body.name,
            artistId: req.body.artistId,
            albumId:req.body.albumId,
            duration:req.body.duration
        })

        newTrack = await newTrack.save();
        res.status(201).json({message: 'New Track Added', data: newTrack})
    }
    catch(err) {
        res.status(500).json({message: `Error While Adding New Track ${err.message}`})
    }  
}
exports.updateTrackWithId = async function (req, res) {
    var id = req.params.id;
    if (!id || !validate(id)) {
        return res.status(400).json({message: 'Provide Valid ID'})
    }
    try {
        const updatedTrack = await TrackCollection.findByIdAndUpdate({id}, req.body)
        res.status(200).json({message: 'Updated Track Details', data: updatedTrack})

    }
    catch (err) {
        res.status(404).json({message: `Track doesn't exist: ${err.message}`})
    }
}
exports.deleteTrackWithId = async function (req, res) {
    var id = req.params.id;
    if (!id || !validate(id)) {
        return res.status(400).json({message: 'Provide Valid ID'})
    }
    try {
        await TrackCollection.findByIdAndRemove({id})
        res.status(204).json({message: 'Deleted Track'})
    }
    catch (err) {
        res.status(404).json({message: `No Track Found With ID: ${id}`})
    }
}
