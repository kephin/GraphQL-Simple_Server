const express = require('express');
const expressGraphQL = require('express-graphql');

const schema = require('./schema');

const app = express();

app.use('/graphql', expressGraphQL({
  graphiql: true,
  schema,
}));

app.listen(8000, () => {
  console.log('Server is running on port 8000...');
})