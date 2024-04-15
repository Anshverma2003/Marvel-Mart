import express from 'express';
import authRouter from './Routers/authRouter.js';
import productRouter from './Routers/productRouter.js'
import productIDRouter from './Routers/productRouter.js'
import cartRouter from './Routers/cartRouter.js'
import addressRouter from './Routers/buyRouter.js'
import cors from 'cors';

const port = 8080;
const app = express();

const allowedOrigins = [
  'https://marvel-mart-ten.vercel.app',
  // Add other origins as needed
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(authRouter);
app.use(productRouter);
app.use(productIDRouter);
app.use(cartRouter);
app.use(addressRouter);

app.listen(port , ()=>{
    console.log(`Server is up and running on ${port}`);
})
