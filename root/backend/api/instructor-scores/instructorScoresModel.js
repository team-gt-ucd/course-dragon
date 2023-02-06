import mongoose from 'mongoose';


export const instructorScoresSchema = mongoose.Schema({
    instructor: String,
    course: String,
    average_rating: String
})

var instructorScoresItem = mongoose.model('instructorScoresitem', instructorScoresSchema);

export default instructorScoresItem