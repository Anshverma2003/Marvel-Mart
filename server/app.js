import express from 'express';
import authRouter from './Routers/authRouter.js';
import cors from 'cors';

const port = 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(authRouter);


app.listen(port , ()=>{
    console.log(`Server is up and running on ${port}`);
})