const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    username: { type: String },
    comments: { type: String},
    rating: { type: Number}
});

module.exports = mongoose.model('Review', reviewSchema);
