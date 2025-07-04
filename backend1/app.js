const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
//const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

mongoose
  .connect("mongodb+srv://poornis2003:RS0sSUKskMhOPzFR@mern-blog-cluster.9twspoq.mongodb.net/?retryWrites=true&w=majority&appName=mern-blog-cluster")
  .then(() => console.log("DB Connected"))
  .catch((e) => console.log(e));
const corsOption = {
  orgin:["http://localhost:5173"],
};
app.use(cors(corsOption));

app.use(express.json());

app.use("/", userRouter);

app.use("/", categoryRouter);
app.use("/", transactionRouter);


app.use(errorHandler);

const PORT = process.env.PORT || 8091;
app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);
