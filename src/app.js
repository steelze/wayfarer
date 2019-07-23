import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import auth from './routes/auth';
import bookings from './routes/bookings';
import buses from './routes/buses';
import trips from './routes/trips';

const base_url = '/api/v1/';
const app = express();
const swagger_doc = require('../swagger.json');

app.use(cors());
app.use(express.json());

app.use(base_url, auth);
app.use(base_url, bookings);
app.use(base_url, buses);
app.use(base_url, trips);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger_doc));

app.use((req, res, next) => {
  const err = new Error('Route not found');
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
