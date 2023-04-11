const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    id: String,
    name: {
        type: String,
        required: true,
        unique: true
    },
    artistId: String,
    albumId: String,
    duration: Number,
})

const TrackModel = mongoose.model('tracks', artistSchema)
module.exports = TrackModel