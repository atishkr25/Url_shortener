require('dotenv').config();

const express = require("express");
const { connectToMongoDB } = require('./connect')

const URL = require('./models/url');
const path = require('path');

const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRouter = require('./routes/user')

const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 8002;

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
        console.log(`Port ${process.env.PORT} already in use. Retrying...`);
        process.exit(1);
    }
});

// //											
