import mongoose from 'mongoose';
import { semesterSchema } from '../semester/semesterModel.js';

export const degreeMapSchema = mongoose.Schema({
    major: {
        type: String,
        minLength: 2,
        maxLength: 30
    },
    catalog_year: {
        type: Number,
        min: 1972,
        max: 3000
    },
    total_credits_needed: {
        type: Number,
        min: 1,
        max: 800
    },
    credits_needed_by_category: [
        {
            category: {
                type: String,
                minLength: 2,
                maxLength: 30
            },
            credits_needed: {
                type: Number,
                min: 1,
                max: 800
            }
        }
    ],
    Semester_list: [semesterSchema],
})

var degreeMapItem = mongoose.model('degreemapitem', degreeMapSchema);

export default degreeMapItem