const mongoose = require("mongoose");
const Quotes = new mongoose.Schema({
  quote: {
    type: String,
    required: true,
  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

});

mongoose.model("Quote",Quotes)
module.exports = Quotes