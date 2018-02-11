import 'babel-polyfill';
import * as RxDB from 'rxdb';
import { sha3_256 as sha } from 'js-sha3';
import * as NewsSchema from './schema/news';
import * as InterestsSchema from './schema/interests';


const collections = [
  {
    name: 'news',
    schema: NewsSchema.default,
    sync: true,
  },
  {
    name: 'interests',
    schema: InterestsSchema.default,
    sync: true,
  },
];

const syncURL = `http://${window.location.hostname}:10101/`;

/* because vue-dev-server only reloads the changed code and not the whole page,
 * we have to ensure that the same database only exists once
 * we can either set ignoreDuplicate to true
 * or remove the previous instance which we do here
 */
window.dbs = window.dbs || [];
const clearPrev = async () => {
  await Promise.all(
         window.dbs
         .map(db => db.destroy()));
};


let dbPromise = null;

const create = async () => {
  RxDB.plugin(require('pouchdb-adapter-websql').default); // eslint-disable-line global-require
  RxDB.plugin(require('pouchdb-adapter-http').default); // eslint-disable-line global-require
  console.log('DatabaseService: creating database..');
  await clearPrev();
  const db = await RxDB.create({
    name: 'rocketnewsdb',
    adapter: 'websql',
    password: 'myLongAndStupidPassword',
  });
  window.dbs.push(db);
  console.log('DatabaseService: created database');
  window.db = db; // write to window for debugging

  // create collections
  console.log('DatabaseService: create collections');
  await Promise.all(collections.map(colData => db.collection(colData)));

  // hooks
  console.log('DatabaseService: add hooks');
  db.interests.preInsert((docData) => {
    docData.id = sha(docData.platform + docData.type + docData.value);
  });

  db.news.preInsert((docData) => {
    docData.id = sha(docData.interest + docData.title + docData.url + docData.date);
  });
  // sync
  console.log('DatabaseService: sync');
  db.interests.sync({
    remote: `${syncURL}interests/`,
  });
  db.news.sync({
    remote: `${syncURL}news/`,
  });

  return db;
};

export default function get() {
  if (!dbPromise) dbPromise = create();
  return dbPromise;
}
