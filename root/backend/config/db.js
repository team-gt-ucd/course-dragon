import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        // Create databaseName and MONGO_URI if config/config.env MONGO_URI is not available
        const databaseName = `my-db`;
        const MONGO_URI = process.env.MONGO_URI || `mongodb://localhost:27017/${databaseName}`;
        console.log("Mongo URI: ", MONGO_URI);
        const con = await mongoose.connect(MONGO_URI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
//        useCreateIndex: true
        });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error in connectDB: ${error.message}`)
        process.exit(1)
    }
}

export default connectDB