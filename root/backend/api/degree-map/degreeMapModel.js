import mongoose from 'mongoose';
import { semesterSchema } from '../semester/semesterModel';

export const degreeMapSchema = mongoose.Schema({
    major: String,
    catalog_year: String,
    total_credits_needed: String,
    credits_needed_by_category: String,
    //Semester_list: [Semester],
})

var degreeMapItem = mongoose.model('degreemapitem', degreeMapSchema);

export default degreeMapItem