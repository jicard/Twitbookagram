import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();


const app = express();
mongoose.connect(process.env.databaseLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const port = process.env.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(require("./routes"));

app.listen(port);
