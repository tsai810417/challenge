const cors = require('cors');
const express = require('express');
const { postgraphile } = require('postgraphile');
const User = require('./user/login');
const { PORT, PG_ADMIN_CONNECTION, JWT_SECRET } = require('./config');

const app = express();

app.disable('x-powered-by');
app.options('*', cors());

app.use(
  postgraphile(PG_ADMIN_CONNECTION, 'logistimatics', {
    pgDefaultRole: 'logistimatics_anonymous',
    dynamicJson: true,
    ignoreRBAC: false,
    ignoreIndexes: true,
    showErrorStack: true,
    extendedErrors: ['hint', 'detail', 'errcode'],

    graphqlRoute: '/graphql',
    graphiqlRoute: '/graphiql',
    graphiql: true,
    enhanceGraphiql: true,

    bodySizeLimit: '1MB',
    enableCors: true,
    jwtVerifyOptions: {
      audience: ['postgraphile'],
    },
    jwtSecret: JWT_SECRET,
    jwtPgTypeIdentifier: 'logistimatics.jwt_token',
  }));

User.initialize(app);

app.all('/api/*', (req, res) => res.status(404).json({ message: 'Unknown endpoint' }));

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
