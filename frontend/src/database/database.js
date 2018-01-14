import 'babel-polyfill';
import * as RxDB from 'rxdb';
import { sha3_256 as sha } from 'js-sha3';
import * as NewsSchema from './schema/news';
import * as InterestsSchema from './schema/interests';

RxDB.plugin(require('pouchdb-adapter-idb'));
RxDB.plugin(require('pouchdb-adapter-http')); // enable syncing over http

const collections = [
  {
    name: 'news',
    schema: NewsSchema,
    sync: true,
  },
  {
    name: 'interests',
    schema: InterestsSchema,
    sync: true,
  },
];

const syncURL = `http://${window.location.hostname}:10101/`;

let dbPromise = null;

const create = async function () {
  console.log('DatabaseService: creating database..');
  const db = await RxDB.create({
    name: 'rocket-news-db',
    adapter: 'idb',
    password: 'myLongAndStupidPassword',
  });
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
  db.heroes.sync({
    remote: `${syncURL}heroes/`,
  });

  return db;
};

export default function get() {
  if (!dbPromise) dbPromise = create();
  return dbPromise;
}
