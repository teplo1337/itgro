const express         = require('express'),
      app             = express(),
      bodyParser      = require('body-parser');

app.post('/', bodyParser.json(), (req, res) => {
  console.log(req.body);
  res.send('ok');
});

app.listen(9002);