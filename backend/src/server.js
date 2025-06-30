import express from 'express';
import notesRouter from './routes/notesRouter.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';
import cors from "cors";
import path from "path";
import dotenv from 'dotenv';


const app = express();

dotenv.config();


const PORT = process.env.PORT | 5001;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173"
    }));
}


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

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "..frontend", "dist", "index.html"))
    });
}



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port 5001');
    })
});