import mongoose from 'mongoose';


export const coursesSchema = mongoose.Schema({
    course_code: String,
    course_title: String,
    course_description: String,
    Credits: Array,
    credits_taken: String,
    prerequisites_list: String,
    instructorScores_list: String
})

var coursesItem = mongoose.model('coursesitem', coursesSchema);

export default coursesItem