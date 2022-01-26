const Kucoin = require("kucoin-websocket-api")

const client = new Kucoin()

// Maximum 100 Symbol / Connection!
// const symbols = ["BTC-USDT"]

module.exports = client;

// let test = async () => {
//   let orderbook = await client.getOrderbook(symbols = )

//   setInterval(()=>{
//       console.log(orderbook.bids[0]);
//   },3000)


//   // With calling connection() it close the socket
//   setTimeout(() => {
//     // Close socket
//     console.log("Close socket!")
//     // connection()
//   }, 10000)
// }

// // Start
// test()