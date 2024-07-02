const mongoose = require('mongoose');

//! Define mongoDB URL

//const mongoURL = 'mongodb://localhost:27017/hotels';
const mongoURL = 'mongodb+srv://paraskadela02:rjKADB0ah65VahAS@cluster0.qga4uov.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;

//! Define event listner for database connection.

db.on('connected', () => {
    console.log('connected to MongoDB server');
});

db.on('error', (err) => {
    console.log('connection error',err);
});

db.on('disconnected', () => {
    console.log('disconnected from MongoDB server');
});

//! Export the database connection
module.exports = db;


