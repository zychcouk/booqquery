const mongoose = require("mongoose")
const transactionSchema = new mongoose.Schema({
  feedItemUid: String,
  amount: Number,
  direction: String,
  transactionTime: Date,
  counterPartyType: String,
  counterPartyName: String,
  reference: String,
  Tag: String,
})
module.exports = mongoose.model("transaction", transactionSchema)
