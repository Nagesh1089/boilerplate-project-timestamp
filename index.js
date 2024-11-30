// init project
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// enable CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// serve static files
app.use(express.static('public'));

// serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint: /api/:date?
app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;

  // If no date is provided, return current date
  if (!dateParam) {
    const now = new Date();
    res.json({
      unix: now.getTime(),
      utc: now.toUTCString(),
    });
    return;
  }

  // If dateParam is a valid timestamp
  if (!isNaN(dateParam)) {
    dateParam = parseInt(dateParam);
  }

  const date = new Date(dateParam);

  // Validate the date
  if (date.toString() === 'Invalid Date') {
    res.json({ error: 'Invalid Date' });
    return;
  }

  // Return valid date response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// listen for requests
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
