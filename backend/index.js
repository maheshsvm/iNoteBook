const connectToMongodb = require('./db')
const express = require('express')
const app = express()
var cors = require('cors')

const port = 5000

// using middleware to deal with json files
app.use(express.json())
app.use(cors())

connectToMongodb();
app.get('/', (req, res) => {
  res.send('Hello Mahesh!')
})

app.use('/api/auth' , require("./routes/auth"))
app.use('/api/notes' , require("./routes/notes"))

app.listen(port, () => {
  console.log(`iNoteBook app listening on port ${port}`)
})