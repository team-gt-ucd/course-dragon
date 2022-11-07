import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        // Create databaseName and MONGO_URI if config/config.env MONGO_URI is not available
        const databaseName = `my-db`;
        const MONGO_URI = process.env.MONGO_URI || `mongodb://127.0.0.1:27017/${databaseName}`;
        const con = await mongoose.connect(MONGO_URI, { 
        useNewUrlParser: true,
        useUnifiedTopology: true
//        useCreateIndex: true
    });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB