// this index.js is actually an express server

const express = require('express')
const cors = require('cors')
const connectToMongo = require('./db');
require("dotenv").config();
const app = express()

connectToMongo();


// cors middleware
app.use(cors())

app.get("/", (req, res) => {
  res.send(`Server is running on PORT ${process.env.PORT}`);
})
// this is middleware for accessing body of the request
app.use(express.json());

// using 2 routes auth and notes in our express app
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// this code is for route, this type of code we will write in '/route/auth.js' and '/route/notes.js' to maintain a better management only
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(process.env.PORT, () => {
  console.log(`Your app is running at PORT ${process.env.PORT || 5001}`);
})