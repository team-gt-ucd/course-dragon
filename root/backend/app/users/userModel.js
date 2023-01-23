import mongoose from 'mongoose';
import degreeMapItem from '../degree-map/degreeMapModel.js'

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
    degree_map: {
        type: [degreeMapItem.degree_map],
        default: []
    }
})

var UserItem = mongoose.model('useritem', userSchema);

export default UserItem