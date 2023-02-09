import mongoose from 'mongoose';
import { creditsSchema } from '../credits/creditsModel.js';
import { instructorScoresSchema } from '../instructor-scores/instructorScoresModel.js';
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