const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=> console.log('Connected!'))
    .catch( ()=> console.log('Connection failed!'))

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


const Course = mongoose.model('Course',courseSchema);

async function getAllCourses(){
    return await Course.find()
        .or([
            {
            isPublished:true,
            name: /.*by.*/
            },
            {
            isPublished:true,
            price: {$gte:15},
            }
        ] )
}

async function giveCourseList(){
    await getAllCourses().then( crs => console.log(crs));
}

giveCourseList().then(()=> console.log('Islem tamam!'));
