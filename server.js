const express = require('express');

const app = express();

app.use(express.static('./dist/parkerbaseDashboard'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/parkerbaseDashboard/'}),
);

app.listen(process.env.PORT || 8080);
