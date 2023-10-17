const express = require('express');
const handlebars = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const {auth} = require('./middlewares/authMiddleware')

const {PORT,DB_URL} = require('./constants');
const routes = require('./router')


//local variables
const app = express();



//express configurations
app.use(express.static(path.resolve(__dirname, './public')))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(auth)


//handlebars config
app.engine('hbs',handlebars.engine({extname:"hbs"}))
app.set('view engine','hbs')
app.set('views', 'src/views')

//Database onnection
async function dbConnect(){
    await mongoose.connect(DB_URL);
}

dbConnect()
.then(()=>{
    console.log('successfully connected to the database');
})
.catch((err) => console.log(`error while connecting to the db. error ${err}`))


//routes
app.use(routes)

app.listen(PORT,()=>console.log(`server is listening on port ${PORT}`))