// HTTP SERVER
import express from 'express';
import cors from 'cors';

// GraphQL - Apollo
import apollo from './graphql';

// Config
import config from './config';

const app = express();

function setPort(port = 5000) {
  app.set('port', parseInt(port, 10));
}

function listen() {
  const port = app.get('port') || config.port;
  app.listen(port, () => {
    console.log(`The server is running and listening at http://localhost:${port}`);
  });
}

app.use(cors({
  origin: config.corsDomain, // Be sure to switch to your production domain
  optionsSuccessStatus: 200
}));

// Endpoint to check if the API is running
app.get('/api/status', (req, res) => {
  res.send({ status: 'ok' });
});

// Append apollo to our API
apollo(app);

export default {
  getApp: () => app,
  setPort,
  listen
};
