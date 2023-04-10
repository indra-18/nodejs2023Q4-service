require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./src/app')
const DB_URL = `${process.env.MONGODB_URI}${process.env.DB_NAME}`
// console.log(DB_URL)
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("Connected To Database")
  }).catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });;


app.listen(process.env.PORT, () => {
    console.log(`App listening on Port ${process.env.PORT}...`)
})
