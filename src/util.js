const fetch = require('node-fetch')
const BASE_URL = 'https://api.hypixel.net'
const fs = require('fs').promises
const HypixelAPIError = require('./exceptions/HypixelAPIError')
const cache = require('./cache')
require('./typedef')
const nbt = require('prismarine-nbt')
const parsePromise = require('util').promisify(nbt.parse)

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
   * @returns {Promise<Player>}
   */
  static async getPlayer(key, uuidOrName, isUniqueId, bypassCache = false) {
    if (!bypassCache && await cache.exists(`player:${uuidOrName}`)) return await cache.getCache(`player:${uuidOrName}`)
    const response = await Util.getAPI('player', key, {[isUniqueId ? 'uuid' : 'name']: uuidOrName})
    if (!response.success) throw new HypixelAPIError(response.cause)
    await cache.setCache(`player:${uuidOrName}`, response.player, 1000*60*60*24) // expires in a day
    return response.player
  }

  /**
   * @param {string} key API key
   * @param {*} profile profile ID, you can grab it from Player.stats.SkyBlock.profiles. (string[])
   * @returns {Promise<SkyBlockProfile>}
   */
  static async getSkyBlockProfile(key, profile, bypassCache = false) {
    if (!bypassCache && await cache.exists(`sbprofile:${profile}`)) return await cache.getCache(`sbprofile:${profile}`)
    const response = await Util.getAPI('skyblock/profile', key, {profile})
    if (!response.success) throw new HypixelAPIError(response.cause)
    await cache.setCache(`sbprofile:${profile}`, response.profile, 1000*60*60) // expires in a hour
    return response.profile
  }

  /**
   * @param {string} key
   * @param {number} page
   * @returns {Promise<SkyBlockAuctionsAPIResponse>}
   */
  static async getSkyBlockAuctions(key, page, bypassCache = false) {
    if (!bypassCache && await cache.exists(`skyblock/auctions/?page=${page}`)) return await cache.getCache(`skyblock/auctions/?page=${page}`)
    const response = await Util.getAPI('skyblock/auctions', key, { page }) // actual type: SkyBlockAuctionsAPIResponse
    if (!response.success) throw new HypixelAPIError(response.cause)
    await cache.setCache(`skyblock/auctions/?page=${page}`, response, 1000*60*60)
    return response
  }

  /**
   * @param {string} key api key
   * @returns {Promise<Array<Auction>>}
   */
  static async getAllSkyblockAuctions(key, bypassCache = false) {
    if (!bypassCache && await cache.exists('skyblock/auctions/all')) return await cache.getCache('skyblock/auctions/all')
    const firstPage = await Util.getSkyBlockAuctions(key, 0)
    let auctions = firstPage.auctions
    for (let i = 1; i < firstPage.totalPages; i++) {
      const res = await Util.getSkyBlockAuctions(key, i)
      auctions = auctions.concat(res.auctions)
    }
    await cache.setCache('skyblock/auctions/all', auctions, 1000*60*60) // expires in 1 hour
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
    return str.replace(/[§]./gm, '')
  }

  /**
   * @param {string} path Path to the file/directory
   * @returns {Promise<boolean>} if file exists or not
   */
  static async exists(path) {
    return fs.stat(path).catch(() => false).then(() => true)
  }

  /**
   * @param {string} data Base64 encoded nbt data
   * @returns {Promise<DecodedCompoundNBT>}
   */
  static async decodeNBT(data) {
    return await parsePromise(Buffer.from(data, 'base64'))
  }

  static convertRank(rank) {
    if (!Util.ranks[rank]) console.log('Unknown rank: ' + rank)
    return Util.ranks[rank] ? Util.ranks[rank].displayName : '[?]'
  }

  static ranks = {
    ADMIN: { displayName: '[ADMIN]' },
    BUILDTEAM: { displayName: '[BUILDTEAM]' },
    MODERATOR: { displayName: '[MODERATOR]' },
    HELPER: { displayName: '[HELPER]' },
    JR_HELPER: { displayName: '[JR HELPER]' },
    PIG_PLUS_PLUS_PLUS_PLUS_PLUS_PLUS_PLUS_PLUS_PLUS_PLUS: { displayName: '[PIG++++++++++]' },
    PIG_PLUS_PLUS_PLUS_PLUS_PLUS_PLUS_PLUS_PLUS_PLUS: { displayName: '[PIG+++++++++]' },
    PIG_PLUS_PLUS_PLUS_PLUS_PLUS_PLUS_PLUS_PLUS: { displayName: '[PIG++++++++]' },
    PIG_PLUS_PLUS_PLUS_PLUS_PLUS_PLUS_PLUS: { displayName: '[PIG+++++++]' },
    PIG_PLUS_PLUS_PLUS_PLUS_PLUS_PLUS: { displayName: '[PIG++++++]' },
    PIG_PLUS_PLUS_PLUS_PLUS_PLUS: { displayName: '[PIG+++++]' },
    PIG_PLUS_PLUS_PLUS_PLUS: { displayName: '[PIG++++]' },
    PIG_PLUS_PLUS_PLUS: { displayName: '[PIG+++]' },
    PIG_PLUS_PLUS: { displayName: '[PIG++]' },
    PIG_PLUS: { displayName: '[PIG+]' },
    PIG: { displayName: '[PIG]' },
    YOUTUBER: { displayName: '[YOUTUBE]' },
    SUPERSTAR: { displayName: '[MVP++]' },
    MVP_PLUS: { displayName: '[MVP+]' },
    MVP: { displayName: '[MVP]' },
    VIP_PLUS: { displayName: '[VIP+]' },
    VIP: { displayName: '[VIP]' },
    DEFAULT: { displayName: '' },
  }

  static BASE = 10_000
  static GROWTH = 2_500
  static HALF_GROWTH = 0.5 * Util.GROWTH
  static REVERSE_PQ_PREFIX = -(Util.BASE - 0.5 * Util.GROWTH) / Util.GROWTH
  static REVERSE_CONST = Util.REVERSE_PQ_PREFIX * Util.REVERSE_PQ_PREFIX
  static GROWTH_DIVIDES_2 = 2 / Util.GROWTH

  /**
   * @param {number} exp 
   * @returns {number} level
   */
  static getLevel(exp) {
    return exp < 0 ? 1 : Math.floor(1 + Util.REVERSE_PQ_PREFIX + Math.sqrt(Util.REVERSE_CONST + Util.GROWTH_DIVIDES_2 * exp))
  }

  static getExactLevel(exp) {
    return Util.getLevel(exp) + Util.getPercentageToNextLevel(exp)
  }

  static getExpFromLevelToNext(level) {
    return level < 1 ? Util.BASE : Util.GROWTH * (level - 1) + Util.BASE
  }

  static getTotalExpToLevel(level) {
    const lv = Math.floor(level)
    const x0 = Util.getTotalExpToFullLevel(lv)
    if (level === lv) return x0
    return (Util.getTotalExpToFullLevel(lv + 1) - x0) * (level % 1) + x0
  }

  static getTotalExpToFullLevel(level) {
    return (Util.HALF_GROWTH * (level - 2) + Util.BASE) * (level - 1)
  }

  static getPercentageToNextLevel(exp) {
    const lv = Util.getLevel(exp)
    const x0 = Util.getTotalExpToLevel(lv)
    return (exp - x0) / (Util.getTotalExpToLevel(lv + 1) - x0)
  }

  /**
   * @param {Date | number} date1
   * @param {Date | number} date2
   * @returns {string} date like 1d2h3m4s
   */
  static dateDiff(date1, date2) {
    const time = typeof date2 === 'number' ? date2-(typeof date1 === 'number' ? date1 : date1.getTime()) : date2.getTime()-(typeof date1 === 'number' ? date1 : date1.getTime)
    const days = Math.floor(time/(1000*60*60*24))
    const hours = Math.floor((time-(1000*60*60*24*days))/(1000*60*60))
    const minutes = Math.floor((time-(1000*60*60*24*days+1000*60*60*hours))/(1000*60))
    const seconds = Math.floor((time-(1000*60*60*24*days+1000*60*60*hours+1000*60*minutes))/1000)
    return `${days === 0 ? '': `${days}d`}${days === 0 && hours === 0 ? '' : `${hours}h`}${days === 0 && hours === 0 && minutes === 0 ? '' : `${minutes}m`}${seconds}s`
  }
}

module.exports = Util
