const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
    artists: {
        type: [String],
        required: true,
    },
    albums: {
        type: [String],
        required: true,
    },
    tracks: {
        type: [String],
        required: true,
    },
});

const favoritesModel = mongoose.model('albums', favoritesSchema)
module.exports = favoritesModel