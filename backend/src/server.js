const Rx = require('rxjs');
const database = require('./database');
const fetchNews = require('./fetchNews');
const interval = 1000;

const run = async function() {
  const DB = await database.get();
  try {
    await DB.interests.insert({
      platform: 'google-news',
      type: 'keyword',
      lastCrawlTime: Date.now(),
      value: 'cat'
    });
  } catch (err) {

  }
  const interests = await DB.interests.find().exec();
  // console.dir(interests.map(doc => doc.toJSON()));
  Rx.Observable.interval(interval).subscribe(async () => {
    await fetchNews(DB);
  });
}

run();
