require('dotenv').config();  // Load environment variables
const mongoose = require('mongoose');

const connectDB = async () => {
    console.log("MongoDB URL:", process.env.MONGO_URL); // Debugging log
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected successfully");
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;



//RS0sSUKskMhOPzFR
//mongodb+srv://poornis2003:RS0sSUKskMhOPzFR@mern-blog-cluster.9twspoq.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog-cluster