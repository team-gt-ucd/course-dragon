import mongoose from 'mongoose';


export const creditsSchema = mongoose.Schema({
    credits_count: String,
    category: String,
})

var creditsItem = mongoose.model('creditsitem', creditsSchema);

export default creditsItem