import mongoose from 'mongoose';


export const instructorScoresSchema = mongoose.Schema({
    instructor: String,
    course: String,
    average_rating: String
})

var InstructorScoresItem = mongoose.model('instructorScoresitem', instructorScoresSchema);

export default InstructorScoresItem