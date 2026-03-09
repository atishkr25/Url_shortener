require('dotenv').config();

const express = require("express");
const { connectToMongoDB } = require('./connect')

const URL = require('./models/url');
const path = require('path');

const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRouter = require('./routes/user')

const app = express();
const PORT = 8002;
//cookie-parser
const cookieParser = require('cookie-parser'); 
app.use(cookieParser());

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection failed:", err.message));

app.use(express.json())
app.use(express.urlencoded({extended : true})) // for parsing form data

app.use("/url" , urlRoute)
app.use('/user', userRouter)
app.use("/" , staticRoute)

app.set("view engine" , "ejs")
app.set("views" , path.resolve("./views"))

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId : shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    if (!entry) {
      return res.status(404).send("Short URL not found");
    }
    res.redirect(entry.redirectURL);
 });

 
app.listen(PORT , ()=> console.log(`Server started at port : ${PORT}`))



//port ko kill karna and restart karna 
process.on('uncaughtException', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} already in use. Retrying...`);
        process.exit(1);
    }
});

// //											
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTVkNTg5NDEzNGZmY2UyYWQ3ZTc3MCIsImVtYWlsIjoicGtAZ21haWwuY29tIiwiaWF0IjoxNzczMDQyMDQ3LCJleHAiOjE3NzMxMjg0NDd9.fJR4gb1_NYE2TIdVEdPuo-9Km7YtikjrwMcdcKq1jVI

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTVkNTg5NDEzNGZmY2UyYWQ3ZTc3MCIsImVtYWlsIjoicGtAZ21haWwuY29tIiwiaWF0IjoxNzczMDQyMDkyLCJleHAiOjE3NzMxMjg0OTJ9.5f5y7UDU16nlkXMWf-xTQuCrEyhhyTmUfz5_RezTCG0