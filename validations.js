const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=> console.log('Connected!'))
    .catch( ()=> console.log('Connection failed!'))


// mongodb has not got any type validation, it accepts what we set and other types we didnt set
// validation layer is on mongoose

// // type validations in mongoose
// const courseSchema = new mongoose.Schema({
//     _id: String,
//     name: {type: String, required:true},
//     author: String,
//     tags: [ String ],
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     isPublished: Boolean,
//     price: Number
// })
//
//
//
//
//
// // dependency to other values
// // if isPublished true then price is required
// const courseSchema = new mongoose.Schema({
//     _id: String,
//     name: {type: String, required:true},
//     author: String,
//     tags: [ String ],
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     isPublished: Boolean,
//     price: {
//         type: Number,
//         required: function(){ return this.isPublished}
//     }
// })

//
//
//
//
//
//
// // min max length and match: regexp pattern
// const courseSchema = new mongoose.Schema({
//     _id: String,
//     name: {
//         type: String,
//         required: true,
//         minlength: 5,
//         maxlength:255,
//         // match: /pattern/
//     },
//     author: String,
//     tags: [ String ],
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     isPublished: Boolean,
//     price: {
//         type: Number,
//         required: function(){ return this.isPublished}
//     }
// })
//
//







// enum checks if data is in the array or not (category enum property)
const courseSchema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:255,
        // match: /pattern/
    },
    author: String,
    tags: [ String ],
    category:{
      type: String,
      required: true,
      enum: ['new','mobile','front-end','back-end','network']
    },
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){ return this.isPublished}
    }
})




const Course = mongoose.model('Course',courseSchema);

