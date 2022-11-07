//install first before doing the import from the node-modules folder
import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import mongoose from "mongoose"
import dotenv from "dotenv"
import session from "express-session"
import passport from "passport"
import localStrategy from "passport-local"
import MongoStore from "connect-mongo"
import User from './models/Users.js'


dotenv.config()     //to use the process dotenv variable

//initialization of app
const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// //mongoes are open database connection
// mongoose.connect(process.env.database)
// mongoose.connection.on("error", console.error.bind(console, "Connection Error"))
// mongoose.connection.once("open", () => {
//     console.log("connected")
// })
// const store = new MongoStore({
//     mongoUrl: process.env.database,
//     touchAfter: 24 * 60 * 60
// })
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post('/add', async (req, res) => {
    const newUser = {
        username: req.body.user,
        password: req.body.pass,
        name: req.body.name,
    }
    await User.create(newUser)
    res.send('sent')
})

app.get('/add', (req, res) => {
    res.render('add')
})


app.get("/", (req, res) => {
    res.render("index")
})


app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.static


app.listen(process.env.port || 3000, () => {
    console.log("we are online")
})