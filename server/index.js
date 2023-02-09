import userRoutes from './routes/user.js';
import postRoutes from './routes/posts.js';
import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import logger from './middlewares/logger.js';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json({ limit: '30mb', extended: true })); //allow access to the request body: body parser now is deprecated, use express instead
app.use(express.urlencoded({ limit: '30mb', extended: true })); //allow access to the request body: body parser now is deprecated, use express instead
app.use(cors());

app.get('/', (req, res) => res.send('Welcome to Share Your Memories API.'));

app.use(logger);

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.CONNECTION_URL).then(
  () => app.listen(PORT, () => console.log(`server running at port: ${PORT}`)),
  (err) => console.log(err.message)
);
