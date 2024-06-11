const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    image: String,
    heading: String,
    desc: String,
    url: String
});

const NewsModel = mongoose.model("news", NewsSchema);
module.exports = NewsModel;