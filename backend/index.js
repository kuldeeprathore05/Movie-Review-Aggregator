import express, { json } from "express";
import cors from 'cors'
import dotenv from "dotenv"; 
import movieRoutes from './routes/movieRoute.js'
import reviewRoutes from './routes/reviewRoute.js'
import connectDb from "./config/db.js";
import seedDB from "./seed.js";
const app = express();
app.use(cors({
    origin: ['http://localhost:5173','https://movie-review-agt.vercel.app','https://transcendent-naiad-794d10.netlify.app'],
    credentials: true,
}));

app.use(express.json()); 
dotenv.config();
await connectDb();
// await seedDB();
app.use('/api/movie',movieRoutes); 
app.use('/api/review',reviewRoutes); 
const PORT = process.env.PORT|| 8000;

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})