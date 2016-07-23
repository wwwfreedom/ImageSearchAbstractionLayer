var express = require('express');
var router = express.Router();
const imgurApiKey = `Client-ID ${process.env.IMGUR_API_KEY}`
const RecentSearch = require('../models/recentImgSearch.js')
const imgurUrl = 'https://api.imgur.com/3/gallery/search/'
const axios = require('axios')
const async = require('asyncawait/async')
const await = require('asyncawait/await')
const moment = require('moment')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// code for image search abstraction layer challenge
router.get('/imgsearch*', async (function (req, res) {
  let searchTerm = req.params[0].substring(1)
  let pageNum = req.query.offset
  let config = {
    headers: { Authorization: imgurApiKey },
    params: {
      q: `title: ${searchTerm}`,
      page: pageNum || 1
    }
  }

  try {
    const images = await (
      axios.get(imgurUrl, config)
      .then((response) => {
        return response.data.data.map((img) => {
          return {
            url: img.link,
            alt_text: img.title
          }
        })
      })
    )

    // create and save the search term using RecentSearch model
    // lesson: use utc for everything then convert to local timezone from there
    // lesson: best to use mongoose createAt to sort by time
    let search = new RecentSearch({
      searchTerm: searchTerm
    })

    RecentSearch.on('index', function (err) {
      if (err) {
        console.error(err);
      }
    })
    // lesson: either .catch() or wrap in await of a promise to make sure error is handle from the save() promise
    await(search.save())

    res.send(images)
  } catch(err) {
    console.log(err)
    return res.status(500).send({error: 'Sorry there a problem with our server. Please try agains later'})
  }
}))

// find the most recent 10 searchs in the database
router.get('/latest/imgsearch', async (function (req, res) {
  try {
    let recentSearches = await(RecentSearch.find({}).limit(10).sort({ createdAt: -1}).lean().exec())
    let modRecentSearches = recentSearches.map((search) => ({
      searchTerm: search.searchTerm,
      time_ago: moment(search.createdAt).fromNow()
    }))
    res.send(modRecentSearches)

  } catch(err) {
    console.log(err)
    return res.status(500).send({error: 'Sorry there a problem with our server. Please try agains later'})
  }
}))

module.exports = router;
