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
//Delete method
async function deleteACourse(id){
    // in update method first parameter defines the conditions (to get target records), second parameter is to modify target documents
    const result = await Course.deleteOne({_id:id})
        console.log(result);
}

deleteACourse({"_id":'5a68fdc3615eda645bc6bdec'}).then(()=> console.log('Islem tamam!'));
