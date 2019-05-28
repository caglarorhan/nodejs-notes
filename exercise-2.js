const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
                .then( ()=> console.log('connected!'))
                .catch( ()=> console.log('mongoDB connections has failed!'))


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


const Course = mongoose.model('Course', courseSchema);


async function getAllCourses(){
    return await Course
        .find({
            isPublished: true
        })
        .sort({
            price:-1
        })
        .select({name:1, author:1})
}


async function giveCoursesList() {
    await getAllCourses().then( crs => console.log(crs))
}

giveCoursesList().then(()=> console.log('Islem tamam!'));
