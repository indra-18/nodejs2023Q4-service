const express = require('express');
const app = express();
const userRouter = require('./routers/user.router')
const artistRouter = require('./routers/artist.router')
const trackRouter = require('./routers/track.router')
const albumRouter = require('./routers/album.router')


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user', userRouter)
app.use('/artist', artistRouter)
app.use('/track', trackRouter)
app.use('/album', albumRouter)

app.get('/', (req, res) => {
    res.status(200).json({Greetings: 'Welcome To Home Library Node REST API'})
})

module.exports = app