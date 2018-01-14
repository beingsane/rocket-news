const getGoogleNewsFeed = require('google-news-feed');

const googleNews = async function(searchterm) {
  return getGoogleNewsFeed(searchterm);
};

module.exports = googleNews;
