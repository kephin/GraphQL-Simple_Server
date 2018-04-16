const express = require('express');
const expressGraphQL = require('express-graphql');
const cors = require('cors');

const schema = require('./schema');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use('/graphql', expressGraphQL({
  graphiql: true,
  schema,
}));

app.listen(8000, () => {
  console.log('Server is running on port 8000...');
})