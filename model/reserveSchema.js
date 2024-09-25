const mongoose = require("mongoose");
const reserveSchema = new mongoose.Schema({
    "date": {type:Number},
    "time": {type:Number},
    "people":{type: Number}
},{
    collection: "reserve"
})

module.exports = mongoose.model("reserveSchema",reserveSchema);