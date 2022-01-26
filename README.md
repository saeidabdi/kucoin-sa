# kucoin_sa

Fault tolerant auto-reconnecting Websocket API for Kucoin and get orderbook!

**Features**

- Auto-reconnecting Websocket it can handle network outage or server disconnections!
- Websocket can be closed any time with a single fn.call()
- Async/Await ready
- It has similar implementation like the binance-api-node

**DEVELOPMENT STATE:**

- This package give support only for Public endpoint.

**Limitations:**

- Kucoin allow only 100 Symbol / connection and 5 connection total!

**Usage**

```
const Kucoin = require("kucoin-sa")


// Maximum 100 Symbol / Connection!
const symbols = ["BTC-USDT", "ETH-BTC"]

let test = async () => {
  //   let orderbook = await client.getOrderbook(symbols)

  //   setInterval(()=>{
  //       console.log(orderbook);
  //       console.log(orderbook.bids[0]);
  //   },3000)
}

// Start
test()

```
