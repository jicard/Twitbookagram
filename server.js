import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();
import router from './routes';


const app = express();
mongoose.set('strictQuery', true);
mongoose.connect(process.env.databaseLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {console.log('Connected to MongoDB Atlas')
})
.catch((err) => {
    console.log(err)
});

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(router);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
