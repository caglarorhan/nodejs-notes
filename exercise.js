const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=>{
        console.log('Connected...')
    })
    .catch( (err)=> console.error('Could not connected to mongoDB!', err));


// Schema
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


// // Model
const Course = mongoose.model('Course', courseSchema);



// List all courses
// async function getAllCourses(){
//     const courses = await Course.find()
//         console.log("All Courses Are: ",courses)
// }
//
// // getAllCourses().then(()=> console.log('Courses listed!'))
// console.log(getAllCourses())






//List all courses
// async function getAllCourses(){
//     const courses = await Course
//         .find()
//         .and([ {isPublished:true},{tags:'backend'} ])
//
//         console.log("All Courses Are: ",courses)
// }
// getAllCourses().then(()=> console.log('Courses listed!'))
//



// sort and pick some fields

async function getAllCoursesSortedByName(){
    const courses = await Course
        .find()
        .select({name:1, author:1})
    //console.log("All Courses Are: ",courses)
    return courses;
}
getAllCoursesSortedByName().then((courses)=> console.log(courses,'Courses listed!'))
