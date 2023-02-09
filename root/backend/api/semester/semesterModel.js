import mongoose from 'mongoose';


export const semesterSchema = mongoose.Schema({
    term: String,
    year: String,
    courses_list: String,
})

var semesterItem = mongoose.model('semesteritem', semesterSchema);

export default semesterItem