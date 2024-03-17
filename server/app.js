import express from 'express';
import authRouter from './Routers/authRouter.js';

const port = 8000;
const app = express();

app.use(express.json());
app.use(authRouter);


app.listen(port , ()=>{
    console.log(`Server is up and running on ${port}`);
})