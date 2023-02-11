import mongoose from 'mongoose';


export const creditsSchema = mongoose.Schema({
    category: {
        type: String,
        minLength: 2,
        maxLength: 30
    },
    credits_count: {
        type: Number,
        min: 1,
        max: 800
    }
})

var creditsItem = mongoose.model('creditsitem', creditsSchema);

export default creditsItem