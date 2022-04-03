const { Command } = require('commander');
const program = new Command();
const api = require('./scripts/controllers/bq-functions');
const mongoose = require('mongoose');
const db = require('./scripts/models/transaction');
mongoose.connect('mongodb://localhost/booqquery');
// bq description and settings
program
  .name('Booqquery')
  .description('Tiny Bookkeeping CLI with Starling integration')
  .version('0.0.1');

// Show uid command
program
  .command('uid')
  .description('Show Uid connected to token')
  .action(() => {
    api.GetStarlingUid().then((response) => {
      console.log(`Account Uid is ${response}`);
      close();
    });
  });

// show balance
program
  .command('balance')
  .description('Show Balance from connected Starling account')
  //.argument("<string>", "string to split")
  //.option("--first", "display just the first substring")
  //.option("-s, --separator <char>", "separator character", ",")
  .action(() => {
    api.GetStarlingBalance().then((amount) => {
      console.log(`The current balance is £${amount}`);
      close();
    });
  });

// show transactions from Api
program
  .command('sync')
  .description('Sync transactions to MongoDb')
  //.argument("<DateFrom>", "From 22-06-2022")
  //.argument("<DateTo>", "Use now for today")
  //.option("--first", "display just the first substring")
  //.option("-s, --separator <char>", "separator character", ",")
  .action(() => {
    api.Sync().then((res) => {
      console.log(res);
    });
  });
function close() {
  mongoose.connection.close();
}
program.parse();
