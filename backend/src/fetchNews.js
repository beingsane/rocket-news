const googleNews = require('./news/google-news');
const maxIntervalInMin = 1;

function calcIntervalInMinutes(lastCrawlTime) {
  const diff = Date.now() - lastCrawlTime;
  return Math.round(diff/1000/60)
}

async function storeNews(news, DB) {
  if(!news) return;
  news.forEach(async(n) => {
    try{
      await DB.news.insert(n);
    } catch (err) {
      console.dir(err);
    }
  });
  try {
    const all = await DB.news.find().exec();
  } catch(err) {
    console.dir(err);
  }
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
        try {
          const googleNewsItems = await googleNews(interest.value);
          if(googleNewsItems) news = googleNewsToNews(googleNewsItems, interest);
        } catch (err) {
          console.dir(err);
        }
        break;
      default:
        break;
    }
    console.dir(news);
    await storeNews(news, DB);

  });
};


module.exports = fetchNews;
