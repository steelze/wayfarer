import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', (req, res) => res.json({ msg: 'Hello World' }));

const port = process.env.PORT || 3000;

/* eslint-disable no-console */

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

/* eslint-enable no-console */

export default app;
