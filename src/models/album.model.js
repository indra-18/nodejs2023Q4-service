const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    id: String,
    name: {
        type: String,
        required: true,
        unique: true
    },
    year: Number,
    artistId: String,
})

const AlbumModel = mongoose.model('albums', albumSchema)
module.exports = AlbumModel