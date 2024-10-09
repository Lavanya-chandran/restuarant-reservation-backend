const mongoose = require("mongoose");
const reserveSchema = new mongoose.Schema({
    Date: {
        type: String,
        //required: true
    },
    time: {
        type: String,
        //required: true
    },
    number_place: {
        type: String,
        //required: true
    },
});
    

module.exports = mongoose.model("reserveSchema",reserveSchema);