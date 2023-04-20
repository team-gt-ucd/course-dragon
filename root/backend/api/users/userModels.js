import mongoose from 'mongoose';
import { degreeMapSchema } from '../degree-map/degreeMapModel.js';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minLength: 8,
        maxLength: 20
    },
    password_hash: {
        type: String,
        minLength: 16,
        maxLength: 16
    },
    account_type: {
        type: String,
        enum: ['student', 'advisor'],
        default: 'student'
    },
    last_logged_in: {
        type: Date,
        default: new Date(),
    },
    Degree_map_list: {
        type: [degreeMapSchema],
        default: []
    }
}, {timestamps: true})

var UserItem = mongoose.model('useritem', userSchema);

export default UserItem