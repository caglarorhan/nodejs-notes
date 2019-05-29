const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(()=> console.log('Connected!'))
    .catch( ()=> console.log('Connection failed!'))

const courseSchema = new mongoose.Schema({
    _id: String,
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


// Update over findById method
// async function updateACourse(id){
//     const course = await Course.findById(id)
//     if(!course){
//         console.log('Course could not find!')
//     }else{
//         course.author = 'Yasar Kemal';
//         const result = await course.save();
//         console.log(result);
//     }
//
// }


//Update over update method
async function updateACourse(id){
    // in update method first parameter defines the conditions (to get target records), second parameter is to modify target documents
    const result = await Course.update({_id:id},{
        $set :{
            author: 'Caglar',
            isPublished: true
        }
    })
        console.log(result);
}

updateACourse({"_id":'5a68fdf95db93f6477053ddd'}).then(()=> console.log('Islem tamam!'));
