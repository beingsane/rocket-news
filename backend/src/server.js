const database = require('./database');


const run = async function() {
  const DB = await database.get();
}

run();
