const artistRouter = require('express').Router();
const artistFunctionalities = require('../controllers/artist.controller')


artistRouter.get('/', artistFunctionalities.getAllArtists)
artistRouter.get('/:id', artistFunctionalities.getArtistWithId)
artistRouter.post('/', artistFunctionalities.postArtist)
artistRouter.put('/:id', artistFunctionalities.updateArtistWithId)
artistRouter.get('/:id', artistFunctionalities.deleteArtistWithId)

module.exports = artistRouter