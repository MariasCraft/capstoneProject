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
import Space from './models/Spaces.js'
import Review from './models/Reviews.js'

dotenv.config()     //to use the process dotenv variable

//initialization of app
const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

//mongoes are open database connection

const store = new MongoStore({
    mongoUrl: process.env.database,
    touchAfter: 24 * 60 * 60
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.listen(process.env.port || 3000, () => {
    mongoose.connect(process.env.database)
    mongoose.connection.on("error", console.error.bind(console, "Connection Error"))
    mongoose.connection.once("open", () => {
        console.log("database connected")
    })
    console.log("we are online: http://localhost:3000")
})
// app.post('/add', async (req, res) => {
//     const newUser = {
//         username: req.body.user,
//         password: req.body.pass,
//         name: req.body.name,
//     }
//     await User.create(newUser)
//     res.send('sent')
// })

// app.get('/add', (req, res) => {
//     res.render('add')
// })

app.get("/", async (req, res) => {
    try {
        const featuredProperty = await Space.find().sort({ rating: -1 }).limit(3)
        res.render("index", { featuredProperty });
    } catch (error) {
        console.log(error.message)
    }

})

app.get('/about', async (req, res) => {
    try {
        const aboutProperty = await Space.find().sort({ rating: -1 }).limit(6)
        res.render('about', { aboutProperty })
    } catch (error) {
        console.log(error.message)
    }

})

app.use(express.static(path.join(__dirname, 'public')))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))




