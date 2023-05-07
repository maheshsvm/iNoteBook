const mongoose = require('mongoose')
const mongoURI = 'mongodb://127.0.0.1:27017/inotebook?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0';

const connectToMongodb =  async()=>{
    await mongoose.connect(mongoURI);
    console.log('connected to mongodb database')
}

module.exports = connectToMongodb;