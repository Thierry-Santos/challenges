const express = require('express');
const cors = require('cors');

const logger = require('./app/Middlewares/Logger');
const routes = require('./routes');

require('./database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);
app.use('/api/v1', routes);

app.listen(3333, () => {
  console.log('🚀 API started')
});