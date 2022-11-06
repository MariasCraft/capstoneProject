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

dotenv.config ()     //to use the process dotenv variable

//initialization of app
const app = express () 
const __dirname = path.dirname (fileURLToPath (import.meta.url)) 

//mongoes are open database connection
mongoose.connect (process.env.database)
mongoose.connection.on ("error", console.error.bind (console, "Connection Error"))
mongoose.connection.once ("open", () => {
          console.log ("connected")
})
const store = new MongoStore ({
          mongoUrl: process.env.database,
          touchAfter: 24*60*60
})


// below are for the routes syntax

app.get("/", (req,res) =>  {
         res.render ("index")
})

app.get("/home", (req,res) =>  {
          res.render ("home")
 })

 
app.set ("view engine", "ejs")
app.set ("views", path.join(__dirname,"views"))




app.listen (process.env.port, () => {
          console.log ("we are online")
})