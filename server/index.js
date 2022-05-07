import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
import dotenv from 'dotenv';
import logger from './middlewares/logger.js';

dotenv.config();

const app = express();

app.use(express.json({ limit: '30mb', extended: true })); //allow access to the request body: body parser now is deprecated, use express instead
app.use(express.urlencoded({ limit: '30mb', extended: true })); //allow access to the request body: body parser now is deprecated, use express instead
app.use(cors());

app.get('/', (req, res) => {
  res.send('hello to memories API');
});

app.use(logger);

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.CONNECTION_URL).then(
  () => {
    app.listen(PORT, () => {
      console.log(`server running at port: ${PORT}`);
    });
  },
  (err) => {
    console.log(err.message);
  }
);
