import mongoose from 'mongoose';

export const instructorScoreSchema = mongoose.Schema({
    instructor: {
        type: String,
        minLength: [2, 'Please input a valid name'],
        maxLength: [20, 'Please input a valid name']
    },
    course_subject: {
        type: String,
        minLength: 3,
        maxLength: 5
    },
    course_code: {
        type: Number,
        minlength: 3,
        maxLength: 5
    },
    average_rating: {
        type: Number,
        min: 0.0,
        max: 5.0
    }
})

var InstructorScoreItem = mongoose.model('instructorScoreitem', instructorScoreSchema);

export default InstructorScoreItem