import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";
import morgan from "morgan";
import { app ,server} from "./socket/socket.js";
import isAuthenticated from "./middlewares/isAuthenticated.js";
// import path from "path";

dotenv.config();

// const app = express();
const PORT = process.env.PORT || 3000;

// const __dirname = path.resolve();
app.use(morgan("dev"));
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
  origin: process.env.URL,
  credentials: true,
};
app.use(cors(corsOptions));

// yha pr apni api ayengi
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);
app.get('/protected-route',isAuthenticated,(req,res)=>{
  return res.status(200).send({
    message:"sucess",
    success: true
  })
})
app.get("/", (req, res) => {
  return res.json("hello from instgram clone");
});
console.log(process.env.URL)
app.use("*", (req, res) => {
  return res.json("wrong route entered");
});



server.listen(PORT, () => {
  connectDB();
  console.log(`Server running at ${PORT}`);
});
