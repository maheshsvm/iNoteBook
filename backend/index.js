const connectToMongodb = require('./db')
const express = require('express')
const app = express()
const port = 5000

// using middleware to deal with json files
app.use(express.json())

connectToMongodb();
app.get('/', (req, res) => {
  res.send('Hello Mahesh!')
})

app.use('/api/auth' , require("./routes/auth"))
app.use('/api/notes' , require("./routes/notes"))

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})