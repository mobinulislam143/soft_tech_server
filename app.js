// basic import
const express = require('express')
const app = new express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')


// Security Middleware Lib Import
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const hpp = require('hpp')
const xss = require('xss-clean');
const cors = require('cors')
const mongoSanitize = require('express-mongo-sanitize')


// Database Lib Import
const mongoose =require('mongoose');

// Security Middleware Implement
app.use(cookieParser())
app.use(cors())
app.use(helmet())
app.use(xss())
app.use(hpp())
app.use(mongoSanitize());

mongoose.set('strictQuery', false);

app.use(bodyParser.json())

const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

// Routing Implement
const appRouter = require('./src/Routes/api')
app.get("/", async (req, res) => {
    res.send("server is healthy");
})
app.use("/api/v1",appRouter)

app.use((req, res) => {
    res.status(404).json({ status: "error", message: "Not Found" });
  });


let URI="mongodb+srv://soft_tech_admin:PMIc5wybWUiTCcBI@cluster0.olinusx.mongodb.net/soft_tech";

mongoose.connect(URI)
.then(()=> {
    console.log(`Mongoose is connected`)
}).catch(e => {
    console.log(e)
})




module.exports = app