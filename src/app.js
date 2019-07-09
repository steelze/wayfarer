import express from 'express';
import cors from 'cors';
import auth from './routes/auth';
import trips from './routes/trips';
import bookings from './routes/bookings';

const baseUrl = '/api/v1/';
const app = express();
app.use(cors());
app.use(express.json());

app.use(baseUrl, auth);
app.use(baseUrl, trips);
app.use(baseUrl, bookings);

app.use((req, res, next) => {
  const err = new Error('No Route Match Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    status: 'error',
    error: err.message,
  });
});

const port = process.env.PORT || 3000;

/* eslint-disable no-console */

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

/* eslint-enable no-console */

export default app;
