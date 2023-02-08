import mongoose from 'mongoose';
import { creditsSchema } from '../credits/creditsModel';
import { instructorScoresSchema } from '../instructor-scores/instructorScoresModel';
export const coursesSchema = mongoose.Schema({
    course_code: String,
    course_title: String,
    course_description: String,
    Credits: creditsSchema,
    credits_taken: String,
    prerequisites_list: [String],
    instructorScores_list: [instructorScoresSchema]
})

var coursesItem = mongoose.model('coursesitem', coursesSchema);

export default coursesItem