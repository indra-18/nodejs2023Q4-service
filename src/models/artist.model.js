const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    id: String,
    name: {
        type: String,
        required: true,
        unique: true
    },
    grammy: Boolean
})

const ArtistModel = mongoose.model('artists', artistSchema)
module.exports = ArtistModel