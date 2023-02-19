import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
import User from "./schemas/User.js"


const app = express();
mongoose.connect(process.env.databaseLink);
const port = process.env.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
//app.use(require"./routes");

app.use("/", (req, res, next) => {
    res.send("Hello world")
})


app.listen(port);
