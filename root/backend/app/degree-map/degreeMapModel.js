import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    major: String,
    catalog_year: String,
    total_credits_needed: String,
    credits_needed_by_category: {
        type: Date,
        default: new Date(),
    },
    Semester_list: [],
})

var UserItem = mongoose.model('useritem', userSchema);

export default UserItem