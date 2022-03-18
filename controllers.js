const axios = require("axios").default
const StarlingApi = require("./starling")
const config = StarlingApi.config
let accountUid = StarlingApi.accountUid
const moment = require("moment")
const mongoose = require("mongoose")
const db = require("./transaction")
mongoose.connect("mongodb://localhost/booqquery")

async function GetStarlingInfo() {
  return axios
    .get(`https://api.starlingbank.com/api/v2/accounts/`, config)
    .then(async function (response) {
      //response.data.accounts[0] = { accountUid, createdAt }
      let info = {
        accountUid: response.data.accounts[0].accountUid,
        AccountCreatedAt: response.data.accounts[0].createdAt,
      }
      return info
    })
}
async function ReturnStarlingBalance() {
  return axios
    .get(
      `https://api.starlingbank.com/api/v2/accounts/${accountUid}/balance`,
      config
    )
    .then(async function (response) {
      return response.data.effectiveBalance.minorUnits
    })
    .catch(function (error) {
      return error
    })
}
async function Sync() {
  // EndDate == "now"
  //   ? (EndDate = moment().toISOString())
  //   : (EndDate = moment(EndDate, "DD-MM-YYYY").toISOString())
  // StartDate = moment(StartDate, "DD-MM-YYYY").toISOString()
  let info = await GetStarlingInfo()
  let FromDate = info.AccountCreatedAt
  let EndDate = moment().toISOString()
  axios
    .get(
      `https://api.starlingbank.com/api/v2/feed/account/${accountUid}/settled-transactions-between?minTransactionTimestamp=${FromDate}&maxTransactionTimestamp=${EndDate}`,
      config
    )
    .then(async function (response) {
      // handle success
      let ParsedTransactions = []
      response.data.feedItems.forEach((element) => {
        const transaction = (({
          feedItemUid,
          amount,
          direction,
          transactionTime,
          counterPartyType,
          counterPartyName,
          reference,
        }) => ({
          feedItemUid,
          amount,
          direction,
          transactionTime,
          counterPartyType,
          counterPartyName,
          reference,
        }))(element)

        console.log(db.where("feedItemUid").equals(element.feedItemUid))
        if (db.find({ feedItemUid: element.feedItemUid }) == false) {
          console.log("test")
          let NewTransaction = transaction.create({
            feedItemUid: element.feedItemUid,
            amount: element.amount.minorUnits,
            direction: element.direction,
            transactionTime: element.transactionTime,
            counterPartyType: element.counterPartyType,
            counterPartyName: element.counterPartyName,
            reference: element.reference,
          })
          console.log(element.amount.minorUnits)
          //await NewTransaction.save()
        }

        //const Newtransaction = await transaction.create({})
      })
    })
    .catch(function (error) {
      // handle error

      console.log(error.message)
      console.log("Did you format the query correctly?")
    })
}
module.exports = { GetStarlingInfo, ReturnStarlingBalance, Sync }
