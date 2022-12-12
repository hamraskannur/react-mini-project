const express = require("express");
const CORS = require('cors')
const app = express()

const adminrouter=require("./routes/admin")
const userrouter=require("./routes/user")
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

app.use(express.json())
app.use(cookieParser())
app.use(CORS({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: [
      'Content-Type',
      'Access'
  ]
}))

mongoose.connect('mongodb://localhost:27017/reactApp',
).then(() => {
    console.log("connected");
}).catch((err) => {
    console.log(err);
})



app.use("/",userrouter)
app.use("/admin",adminrouter)

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});