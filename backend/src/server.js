import express from 'express';
import notesRouter from './routes/notesRouter.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import cors from "cors";

const app = express();

connectDB();

// middleware
app.use(cors({
    origin: "http://localhost:5173"
}));

// allows for parsing JSON bodies

app.use(express.json());
app.use(rateLimiter);


// middleware exampel to log and parse request
// app.use((req, res, next) => {
//     console.log("We just hit the middleware and got a new request!");
//     console.log(`here is the request, ${req.method} and ${req.url}`)
//     next();
// })

app.use("/api/notes", notesRouter);

app.listen(5001, () => {
    console.log('Server is running on port 5001');
})