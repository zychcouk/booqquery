// 1. Generate personal use key from https://developer.starlingbank.com/ and  rename this file to starling.js
const token = "Your Key"

exports.config = {
  headers: { Authorization: `Bearer ${token}` },
}
// 2. Run booqquery uid and paste the returned uid here
exports.accountUid = "your Uid"
