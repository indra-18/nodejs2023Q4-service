const albumRouter = require('express').Router();
const albumFunctionalities = require('../controllers/album.controller')


albumRouter.get('/', albumFunctionalities.getAllAlbums)
albumRouter.get('/:id', albumFunctionalities.getAlbumWithId)
albumRouter.post('/', albumFunctionalities.postAlbum)
albumRouter.put('/:id', albumFunctionalities.updateAlbumWithId)
albumRouter.get('/:id', albumFunctionalities.deleteAlbumWithId)

module.exports = albumRouter