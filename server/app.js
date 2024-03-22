import express from 'express';
import authRouter from './Routers/authRouter.js';
import productRouter from './Routers/productRouter.js'
import productIDRouter from './Routers/productRouter.js'
import cartRouter from './Routers/cartRouter.js'
import cors from 'cors';

const port = 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use(productRouter);
app.use(productIDRouter);
app.use(cartRouter);


app.listen(port , ()=>{
    console.log(`Server is up and running on ${port}`);
})