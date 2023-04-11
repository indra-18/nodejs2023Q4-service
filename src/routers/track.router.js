const trackRouter = require('express').Router();
const trackFunctionalities = require('../controllers/track.controller')


trackRouter.get('/', trackFunctionalities.getAllTracks)
trackRouter.get('/:id', trackFunctionalities.getTrackWithId)
trackRouter.post('/', trackFunctionalities.postTrack)
trackRouter.put('/:id', trackFunctionalities.updateTrackWithId)
trackRouter.get('/:id', trackFunctionalities.deleteTrackWithId)

module.exports = trackRouter