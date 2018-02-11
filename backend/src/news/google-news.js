const getGoogleNewsFeed = require('google-news-feed');

const googleNews = async function(searchterm) {
  const news = await getGoogleNewsFeed(searchterm);
  return news;
};

module.exports = googleNews;
