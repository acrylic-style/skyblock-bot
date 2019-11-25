const fetch = require('node-fetch')
const BASE_URL = 'https://api.hypixel.net'
const fs = require('fs').promises
const HypixelAPIError = require('./exceptions/HypixelAPIError')
const cache = require('./cache')

/**
 * Provides useful static methods.
 */
class Util {
  /**
   * @param {string} resource
   * @param {string} key API key generated from in-game
   * @param {number} page Page number
   * @returns {Promise<APIResponse>} API Response
   */
  static async getAPI(resource, key, params) {
    let param = ''
    Object.keys(params).forEach(key => {
      param = param + `&${key}=${params[key]}`
    })
    return await fetch(`${BASE_URL}/${resource}?key=${key}${param}`).then(res => res.json())
  }

  /**
   * @param {string} key API key
   * @param {string} uuidOrName
   * @param {boolean} isUniqueId
   * @returns {Player}
   */
  static async getPlayer(key, uuidOrName, isUniqueId) {
    const response = await this.getAPI('player', key, {[isUniqueId ? 'uuid' : 'name']: uuidOrName})
    if (!response.success) throw new HypixelAPIError(response.cause)
    await cache.setCache(`player:${uuidOrName}`, response.player, 1000*60*60*24*7) // expires in a week
    return response.player
  }

  /**
   * @param {string} key
   * @param {number} page
   * @returns {Promise<SkyBlockAuctionsAPIResponse>}
   */
  static async getSkyBlockAuctions(key, page) {
    const response = await this.getAPI('skyblock/auctions', key, { page })
    if (!response.success) throw new HypixelAPIError(response.cause)
    await cache.setCache('skyblock/auctions', JSON.stringify(response.auctions), 1000*60*10)
    return response.auctions
  }

  static async getAllSkyblockAuctions(key) {
    if (await cache.exists('skyblock/auctions/all')) return await cache.getCache('skyblock/auctions/all')
    const firstPage = await this.getSkyBlockAuctions(key, 0)
    const auctions = firstPage.auctions
    for (let i = 1; i < firstPage.totalPages; i++) {
      const res = await this.getSkyBlockAuctions(key, i)
      auctions.concat(res.auctions)
    }
    await cache.setCache('skyblock/auctions/all', JSON.stringify(auctions), 1000*60*10) // expires in 10 minutes
    return auctions
  }

  static async getData() {
    return JSON.parse(await fs.readFile(__dirname + '/../data.json', { encoding: 'utf-8' }))
  }

  static async setValue(key, value) {
    const data = Util.getData()
    data[key] = value
    return await fs.writeFile(__dirname + '/../data.json', JSON.stringify(data))
  }

  static async setData(data) {
    return await fs.writeFile(__dirname + '/../data.json', JSON.stringify(data))
  }

  /**
   * @param {string} str 
   * @returns {string} string without color codes
   */
  static stripColor(str) {
    str.replace(/[§]./gm, '')
  }

  static async exists(path) {
    return await fs.stat(path).catch(() => false).then(() => true)
  }
}

module.exports = Util
