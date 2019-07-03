const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=> console.log('Connected!'))
    .catch( ()=> console.log('Connection failed!'))


// checkout the lowercase true, this convert Uppercase in category input to lowercase. Same way uppercase is
const courseSchema = new mongoose.Schema({
    _id: String,
    name: String,
    author: String,
    tags: [ String ],
    category: {
        type: String,
        required: true,
        enum: ['web','mobile','network','front-end'],
        lowercase: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: Number
})


const Course = mongoose.model('Course',courseSchema);


/*
    lowercase
    uppercase
    trim
    //for Number types
    min
    max
    get: v => Math.round(v), // for reading
    set: v => Math.round(v) // for saving

*/
