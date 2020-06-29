const { Pool } = require('pg');
const { PG_ADMIN_CONNECTION } = require('./config');

const pool = new Pool({
  connectionString: PG_ADMIN_CONNECTION,
  max: 10,
  min: 1,
  idleTimeoutMillis: 10 * 1e3,
});

function execute(query, params) {
  return new Promise(function(resolve, reject) {
    pool.query(query, params, function(err, result) {
      if(err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  execute,
};
