require("dotenv").config();
require("express-async-errors");
//express
const express = require("express");
const app = express();
// database
const connectDB = require("./db/connect");
//rest of the package
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
//routers
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  res.send("e-commerse api");
});
app.get("/api/v1", (req, res) => {
  console.log(req.signedCookies)
  res.send("e-commerse api");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(5000, () => console.log(`server is listening at ${port}`));
  } catch (error) {
    console.error(error);
  }
};

start();
