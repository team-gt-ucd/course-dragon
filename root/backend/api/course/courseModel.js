import mongoose from 'mongoose';
import { creditsSchema } from '../credits/creditsModel.js';
import { instructorScoreSchema } from '../instructor-score/instructorScoreModel.js';
export const courseSchema = mongoose.Schema({
    term: {
        type: String,
        enum: ['fall', 'winter', 'spring', 'summer'],
        default: 'fall'
    },
    year: {
        type: Number,
        min: [1973, 'Please enter a valid year'],
        max: [3000, 'Please enter a valid year']
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
    course_title: {
        type: String,
        minLength: 2,
        maxLength: 30,
    },
    course_description: {
        type: String,
        minLength: 1,
        maxLength: 200
    },
    Credits: creditsSchema,
    taken: {
        type: Boolean,
        default: false
    },
    prerequisites_list: [
        {
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
        }
    ],
    Instructor_score_list: [instructorScoreSchema]
})

var courseItem = mongoose.model('courseitem', courseSchema);

export default courseItem