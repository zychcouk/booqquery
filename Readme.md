## About The Project

**Booqquery** is a CLI accounting tool with the ability to connect to
**Starling** bank sync transactions to MongoDB database and add tags and
calculate totals and export the data to excel files. In the future there will be
a feature to generate **invoices** and more.

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project
locally. To get a local copy up and running follow these simple example steps.

### Prerequisites

Make sure you got the following installed on your system

- MongoDB
- Node

### Installation

_All you need to do is to clone the repo and run_

1. Clone the repo
   ```sh
   git clone https://github.com/zychcouk/Booqquery.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Update `starling-template.js` with your developer token and rename it to
   `starling.js`

   ```js
   const token = "Your Key"
   ```

   4. Optionally add an alias to your `bash.rc` or equivalent

   ```js
    alias booqquery = 'node /path/to/booqquery.js'
   ```

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional
screenshots, code examples and demos work well in this space. You may also link
to more resources.

- Get current balance

  ```sh
  booqquery balance
  ```

  Sample output:

```sh
 booq
    <!-- ROADMAP -->

## Roadmap

- [x] Add tags
- [ ] Add ability to export to excel
- [ ] Add Invoicing

<!-- LICENSE -->

## License

Distributed under the ISC License.

<!-- CONTACT -->

## Contact

Your Name - [@zychcouk](https://twitter.com/zychcouk) - ziggy@zych.co.uk

Project Link:
[https://github.com/zychcouk/Booqquery.git](https://github.com/zychcouk/Booqquery.git)
```
