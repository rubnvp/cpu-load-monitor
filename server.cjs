const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello there!');
});

app.get('/api/cpu-load', (req, res) => {
  const [ lastMinuteLoad ] = os.loadavg();
  const cpusCount = os.cpus().length;
  // normalized last minute CPU load average
  const loadAverage = lastMinuteLoad / cpusCount;
  console.log(req.originalUrl, loadAverage);
  res.json({ loadAverage });
});

// log not found errors
app.use((req, res, next) => {
  console.error('Not found', req.originalUrl);
  res.status(404).send('Not found');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});