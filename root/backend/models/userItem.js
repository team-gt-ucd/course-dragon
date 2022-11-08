import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    username: String,
    password_hash: String,
    account_type: String,
    date_account_created: {
        type: Date,
        default: new Date(),
    },
    last_logged_in: {
        type: Date,
        default: new Date(),
    },
})

var UserItem = mongoose.model('useritem', userSchema);

export default UserItem