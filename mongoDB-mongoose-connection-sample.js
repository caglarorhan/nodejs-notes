// After MongoDB ve mongoose installed
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground') //if there is no collection named playground, MongoDB creates one automatically!
    .then(()=> console.log('Connected to MongoDB...'))
    .catch( (err)=> console.error('Could not connected to mongoDB!', err));

/*
In mongoDB Tables of RDBS called Collections
and rows of RDBS tables are called Documents


* */

// In Mongoose we use Schema
// Schema s are not part of MongoDB,
// We use Schema s to define MongoDB Collections

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean

})

// Schema types:    String, Number, Date, Buffer, Boolean, ObjectID, Array

// Schemas should compiled into models in Node
const Course = mongoose.model('Course', courseSchema); // we create a class (model) named Course.

// CREATE COURSE
// //we need an async function to wrap all saving process, because .save() method is asynchronous and may take time to complete!
// async function createCourse(){
//     // now create an object from this class (model)
//     const course = new Course({
//         name: 'MongoDB course',
//         author: 'Caglar',
//         tags: [ 'mongoDB','database' ],
//         isPublished: true
//
//     })
//
// // and now save this document to database (mongoDB). When we save it it called document in the database
// // this saving operation is asynchronous, it may take time
//
//     const result = await course.save();
//     console.log(result);
// }
//
// createCourse().then((res)=>console.log('A new course created!',res));



// GET COURSES FROM DB
// getting courses from database
// async function getCourses(){
//     const courses = await Course.find();
//     console.log(courses)
// }
//
// getCourses().then(()=> console.log('All course listed!'))


// // GET SOME OF THE COURSES
// async function getSomeCourses(){
//     const courses = await Course.find({
//         author: 'Ali',
//         isPublished: false
//     });
//     console.log(courses)
// }
// getSomeCourses().then(()=> console.log('Some course listed!'))


// GET COURSES IN SOME ORDER
async function getSomeCoursesInOrder(){
    const courses = await Course
        .find({

    })
        .limit(2)
        .sort({
            author: 1
        })
    console.log(courses)
}
getSomeCoursesInOrder().then(()=> console.log('Some course listed in an order!'))
