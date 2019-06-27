const express = require('express')
const app = express();

app.get('/', (req, res) => res.json({msg: 'Hello World'}));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is running, check me out on http://localhost:${port}`);
});
