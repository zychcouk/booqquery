const { Command } = require("commander")
const program = new Command()
const api = require("./controllers")

program
  .name("Booqquery")
  .description("Tiny Bookkeeping CLI with Starling integration")
  .version("0.0.1")

program
  .command("uid")
  .description("Show Uid connected to Token")
  .action(() => {
    api.GetStarlingInfo("uid").then((res) => {
      console.log(res)
    })
  })

// show balance
program
  .command("balance")
  .description("Show Balance from connected Starling account")
  //.argument("<string>", "string to split")
  //.option("--first", "display just the first substring")
  //.option("-s, --separator <char>", "separator character", ",")
  .action(() => {
    api.ReturnStarlingBalance().then((res) => {
      let amount = res / 100
      console.log(`The current balance is £${amount}`)
    })
  })

// show transactions from Api
program
  .command("sync")
  .description("Sync transactions to MongoDb")
  //.argument("<DateFrom>", "From 22-06-2022")
  //.argument("<DateTo>", "Use now for today")
  //.option("--first", "display just the first substring")
  //.option("-s, --separator <char>", "separator character", ",")
  .action(() => {
    api.Sync().then((res) => {
      console.log(res)
    })
  })

program.parse()
