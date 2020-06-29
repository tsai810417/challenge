const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const { execute } = require('../db');
const { JWT_SECRET } = require('../config');
const get = require('lodash.get');

function loginHandler(req, res) {
  const {
    email,
    password,
  } = req.body;

  return execute(`
    select
      u.id as user_id
    from logistimatics.user u
    join logistimatics_private.user_account ua on ua.id = u.id
    where u.email = $1
      and ua.password_hash = crypt($2, ua.password_hash)`, [email, password]).then((result) => {
    if(get(result, ['rows', 'length']) !== 1) {
      res.status(404).json({ message: 'Invalid username or password' });
    } else {
      const user_id = get(result, ['rows', 0, 'user_id']);
      const token = jsonwebtoken.sign({
        role: 'logistimatics_user',
        user_id,
      }, JWT_SECRET, {
        audience: 'postgraphile',
        issuer: 'postgraphile',
        expiresIn: '1 year',
      });

      res.json({ token });
    }
  }).catch((error) =>
    res.status(500).json({ message: get(error, ['message'], 'Unknown error') }));
}

function initialize(app) {
  app.post('/api/user/login', bodyParser.json(), loginHandler);
}

module.exports = {
  initialize,
};
