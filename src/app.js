const express = require('express');

const app = express();

app.get('/', (req, res) => res.json({ msg: 'Hello World' }));

const port = process.env.PORT || 3000;

/* eslint-disable no-console */

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});

/* eslint-enable no-console */
