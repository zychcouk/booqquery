const { Command } = require("commander")
const program = new Command()
const StarlingApi = require("./starling")
const config = StarlingApi.config
let accountUid = StarlingApi.accountUid
const axios = require("axios").default
const moment = require("moment")
let today = moment().toISOString()
program
  .name("Booqquery")
  .description("Tiny Bookeeping CLI with Starling integration")
  .version("0.0.1")

program
  .command("balance")
  .description("Show Balance from connected Starling account")
  //.argument("<string>", "string to split")
  //.option("--first", "display just the first substring")
  //.option("-s, --separator <char>", "separator character", ",")
  .action((str, options) => {
    axios
      .get(
        `https://api.starlingbank.com/api/v2/accounts/${accountUid}/balance`,
        config
      )
      .then(async function (response) {
        // handle success
        let ammount = response.data.effectiveBalance.minorUnits / 100

        console.log(`The current balance is £${ammount}`)
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  })

program
  .command("Transactions")
  .description("Show Balance from connected Starling account")
  .argument("<DateFrom>", "From 22-06-2022")
  .argument("<DateTo>", "Empty for today")
  //.option("--first", "display just the first substring")
  //.option("-s, --separator <char>", "separator character", ",")
  .action((fromDate, toDate) => {
    fromDate = moment(fromDate, "DD-MM-YYYY").toISOString()
    toDate = moment(toDate, "DD-MM-YYYY").toISOString()

    axios
      .get(
        `https://api.starlingbank.com/api/v2/feed/account/${accountUid}/settled-transactions-between?minTransactionTimestamp=${fromDate}&maxTransactionTimestamp=${toDate}`,
        config
      )
      .then(async function (response) {
        // handle success
        console.log(response.data)
      })
      .catch(function (error) {
        // handle error

        console.log(error.message)
      })
  })

program.parse()
