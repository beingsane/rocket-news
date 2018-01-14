const googleNews = require('./news/google-news');
const maxIntervalInMin = 1;

function calcIntervalInMinutes(lastCrawlTime) {
  const diff = Date.now() - lastCrawlTime;
  return Math.round(diff/1000/60)
}

async function storeNews(news, DB) {
  news.forEach(async(n) => {
    try{
      await DB.news.insert(n).exec();
    } catch (err) {

    }
  });
  const all = await DB.news.find().exec();
  console.dir(all);
}

function googleNewsToNews(news, interest) {
  return news.map(n => {
    return {
      interest: interest.id,
      title: n.title,
      url: n.link,
      date: new Date(n.pubDate).getTime()/1000,
      text: n.description
    }
  });
}

const fetchNews = async function(DB) {
  const interests = await DB.interests.find().exec();
  interests.forEach(async(interest) => {
    if(calcIntervalInMinutes(interest.lastCrawlTime) < maxIntervalInMin) return;
    let news;
    switch (interest.platform) {
      case 'google-news':
        const googleNewsItems = await googleNews(interest.value);
        news = googleNewsToNews(googleNewsItems, interest);
        break;
      default:
        break;
    }
    storeNews(news, DB);

  });
};


module.exports = fetchNews;
