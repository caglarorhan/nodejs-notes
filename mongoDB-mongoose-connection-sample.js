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
    isPublished: Boolean,
    price: Number

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

//
// // GET COURSES IN SOME ORDER
// in sort object, for ascending order use : 1 or "asc" or "ascending"
// in sort object, for descending order use : -1 or "desc" or "descending"
// async function getSomeCoursesInOrder(){
//     const courses = await Course
//         .find({
//
//     })
//         .limit(2)
//         .sort({
//             author: 1
//         })
//     console.log(courses)
// }
// getSomeCoursesInOrder().then(()=> console.log('Some course listed in an order!'))

//
// // GET COURSES IN SOME ORDER
// async function getSomeCoursesPropertiesInOrder(){
//     const courses = await Course
//         .find({
//
//     })
//         .limit(2)
//         .select({
//          name: 1, tags:1
//         })
//     console.log(courses)
// }
// getSomeCoursesPropertiesInOrder().then(()=> console.log('Some course listed in an order!'))





// // OPERATORS
// async function getSomeCoursesInACondition(){
//     // eq (equal)
//     // ne (not equal)
//     // gt (greater than)
//     // gte (greater than and equal to)
//     // lt (less than)
//     // lte (less than or equal to)
//     // in
//     // nin (not in)
//     const courses = await Course
//         .find({price: {$in: [10,12,8]}})
//         //.find({price: {$in: [10,12,8]}})
//         //.find({price: {$gte:10, $lte:14}})
//
//     console.log(courses)
// }
// getSomeCoursesInACondition().then(()=> console.log('Some course listed in an order!'))

//
// // OR & AND operators
// async function getSomeCoursesInACondition(){
//     // eq (equal)
//     // ne (not equal)
//     // gt (greater than)
//     // gte (greater than and equal to)
//     // lt (less than)
//     // lte (less than or equal to)
//     // in
//     // nin (not in)
//     const courses = await Course
//         .find()
//     //.or([ {author: 'Caglar'},{ isPublished: true} ])
//         .and( [{price: {$lt:14}}, {isPublished: false}])
//
//     console.log(courses)
// }
// getSomeCoursesInACondition().then(()=> console.log('Some course listed in an order!'))
//
//
//
// // Regular Expression
// async function getSomeCoursesInACondition(){
//     const courses = await Course
//         .find({author: /.*gla.*/})
//         //.find({author:/^Ah/})
//         //.find({author:/pattern/}) pattern is regular expression, if a string pattern at the beginning of use caret ^ char in front of it
//         //.find({author:/met$/}) // Strings that ending with met, this is case sensitive
//         //.find({author:/Met$/i}) // this is case insensitive (/i sign)
//         //find({author: /.*hme.*/}) // includes hme at anywhere in the string
//     console.log(courses)
// }
// getSomeCoursesInACondition().then(()=> console.log('Some course listed in an order!'))



//
//
//
// // count of results
// async function getSomeCoursesInACondition(){
//     const courses = await Course
//         .find({author: /.*gla.*/})
//         .count()
//     console.log(courses)
// }
//
// getSomeCoursesInACondition().then(()=> console.log('Done'))
//





// Pagination
async function getSomeCoursesInACondition(){
    const pageNumber = 2;
    const pageSize = 3;

    const courses = await Course
        .find()
        .skip((pageNumber-1)*pageSize)
        .limit(pageSize)
    console.log(courses)
}

getSomeCoursesInACondition().then(()=> console.log('Done'))
