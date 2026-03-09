const {nanoid} = require("nanoid");
const URL = require('../models/url')


async function handleGenerateNewShortURL(req , res){
    const shortID = nanoid(6);
    const body = req.body;
    // console.log(shortID);

    if(!body.url) return  res.status(400).json({error : 'url is required'});

    await URL.create({
        shortId : shortID,
        redirectURL : body.url,
        visitHistory : []
    });
    // Store the last generated shortID in session or flash (optional), or just redirect
    return res.redirect('/');
}

async function handleGetAnalytics(req , res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId : shortId })
    if (!result) {
        return res.status(404).json({ error: 'Short URL not found' });
    }
    return res.json({ 
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    })
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics
}