const axios = require("axios").default
const StarlingApi = require("./starling")
const config = StarlingApi.config
let accountUid = StarlingApi.accountUid

async function GetStarlingInfo() {
  axios
    .get(`https://api.starlingbank.com/api/v2/accounts/`, config)
    .then(async function (response) {
      //response.data.accounts[0] = { accountUid, createdAt }
      console.log(response)
    })
}
async function PrintStarlingBalance() {
  axios
    .get(
      `https://api.starlingbank.com/api/v2/accounts/${accountUid}/balance`,
      config
    )
    .then(async function (response) {
      // handle success
      let amount = response.data.effectiveBalance.minorUnits / 100
      console.log(`The current balance is £${amount}`)
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
}

module.exports = { GetStarlingInfo, PrintStarlingBalance }
