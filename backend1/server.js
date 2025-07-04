require('dotenv').config();
const express = require("express");
const Post = require("./models/Post");  // Ensure correct import
const connectDB = require("./utils/connectDB");
//const billRoutes = require("./routes/bills");



connectDB();
const app = express();
const PORT = process.env.PORT || 8091;

app.use(express.json());

app.post("/api/v1/posts/create", async (req, res) => {
    try {
        const postData = req.body;
        const postCreated = await Post.create(postData);
        res.json({
            status: "success",
            message: "Post created successfully",
            postCreated,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
