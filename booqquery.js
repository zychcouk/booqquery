const { Command } = require("commander")
const program = new Command()

const api = require("./controllers")
const moment = require("moment")

program
  .name("Booqquery")
  .description("Tiny Bookkeeping CLI with Starling integration")
  .version("0.0.1")

program.command("test").action(() => {
  let info = api.GetStarlingInfo()
  console.log(info)
})

// show balance
program
  .command("balance")
  .description("Show Balance from connected Starling account")
  //.argument("<string>", "string to split")
  //.option("--first", "display just the first substring")
  //.option("-s, --separator <char>", "separator character", ",")
  .action((str, options) => {
    api.PrintStarlingBalance()
  })

// show transactions from Api
program
  .command("sync")
  .description("Sync transactions to MongoDb")
  .argument("<DateFrom>", "From 22-06-2022")
  .argument("<DateTo>", "Use now for today")
  //.option("--first", "display just the first substring")
  //.option("-s, --separator <char>", "separator character", ",")
  .action((fromDate, toDate) => {
    toDate == "now"
      ? (toDate = moment().toISOString())
      : (toDate = moment(toDate, "DD-MM-YYYY").toISOString())
    fromDate = moment(fromDate, "DD-MM-YYYY").toISOString()

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
        console.log("Did you format the query correctly?")
      })
  })

program.parse()
