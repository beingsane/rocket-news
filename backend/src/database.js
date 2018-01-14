require('babel-polyfill');
const sha = require('js-sha3').sha3_256;
const RxDB = require('rxdb');
RxDB.plugin(require('pouchdb-adapter-node-websql'));
RxDB.plugin(require('pouchdb-adapter-http'));
const interestSchema = require('./schema/interests');
const newsSchema = require('./schema/news');
const Database = {};

const create = async () => {
  const database = await RxDB.create({
    name: './rocketnews',
    adapter: 'websql',
    multiInstance: false
  });
  await database.collection({
    name: 'interests',
    schema: interestSchema
  });
  database.interests.preInsert(docData => {
    docData.id = sha(docData.platform + docData.type + docData.value);
  });
  await database.collection({
    name: 'news',
    schema: newsSchema
  });
  database.news.preInsert(docData => {
    docData.id = sha(docData.interest + docData.title + docData.url + docData.date);
  });
  return database;
};

let createPromise = null;
Database.get = async () => {
  if (!createPromise) createPromise = create();
  return createPromise;
};


module.exports = Database;
