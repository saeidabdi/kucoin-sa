"use strict"

const { openMarketMatches, openMarketLevel2 } = require("../../kucoin-websocket-api/src/websocket")
const axios = require("axios")

class Kucoin_API {
  constructor() {
    this.baseURL = "https://openapi-v2.kucoin.com"
    this.orderbook = {asks:[],bids:[]}
  }

  async MarketMatches(symbols) {
    let endpoint = await this.getSocketEndpoint()

    let result = await openMarketMatches(endpoint, symbols, (e)=>{
      console.log('sss');
    })

    // Return Close function
    return result
  }

  async MarketLevel2(symbols) {
    let endpoint = await this.getSocketEndpoint()

    let result = await openMarketLevel2(endpoint, symbols, (e)=>{
      if(e.changes.bids.length){
        this.orderbook.bids.push(e.changes.bids)
      }if(e.changes.asks.length){
        this.orderbook.asks.push(e.changes.asks)
      }
      this.LightenOrderbook()
    })

    // Return Close function
    return result
  }

  async getOrderbook(symbols){
    if(this.orderbook.asks.length <= 0 && this.orderbook.bids.length <= 0)
      await this.MarketLevel2(symbols)
    return this.orderbook;
  }

  LightenOrderbook(){
      if(this.orderbook.bids.length > 40){
        this.orderbook.bids = this.orderbook.bids.slice(-40)
      }if(this.orderbook.asks.length > 40){
        this.orderbook.asks = this.orderbook.asks.slice(-40)
      }
  }

  // Kucoin token methods

  async getPublicWsToken() {
    let endpoint = "/api/v1/bullet-public"
    let url = this.baseURL + endpoint
    let result = await axios.post(url, {})
    return result.data
  }

  async getSocketEndpoint() {
    let r

    r = await this.getPublicWsToken()

    let token = r.data.token
    let endpoint = r.data.instanceServers[0].endpoint

    return `${endpoint}?token=${token}&[connectId=${Date.now()}]`
  }
}

module.exports = Kucoin_API
