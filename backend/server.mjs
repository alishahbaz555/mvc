import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userDataRoutes from './routers/userData.js';

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', userDataRoutes);

app.listen(port, ()=>{
    console.log(`The server is successfully connected to PORT: ${port}🔥`)
})
