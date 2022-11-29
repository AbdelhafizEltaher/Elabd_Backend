const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const dotenv = require('dotenv')
const UserRouter = require('./Routes/UserRoute')

dotenv.config()
mongoose.connect(process.env.DB_URL)
mongoose.connection.on("connected", function () {
    console.log("Mongoose Connected to DB");
})
mongoose.connection.on("error", function (error) {
    console.log(error.message);
})
mongoose.connection.on("disconnected", function () {
    console.log("Mongoose Connection is Disconnected");
})
process.on('SIGINT', async function () {
    await mongoose.connection.close()
    process.exit(0)
})
var app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use("/elabdfoods/User/",UserRouter)


app.use('*', function (req, res, next) {
    res.status(302).redirect('/not-found');
});

app.listen(process.env.PORT | 3000, function () {
    console.log("successfully Listening");
})