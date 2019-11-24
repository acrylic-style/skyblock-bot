const fetch = require('node-fetch')
const BASE_URL = 'https://api.hypixel.net'

/**
 * @typedef APIResponse
 * @property {boolean} success If api request succeeded or not
 * @property {number} page Current page. Default: 0
 * @property {number} totalPages Total pages available
 * @property {number} totalAuctions Count of all auctions, including expired auctions.
 * @property {number} lastUpdated Last updated time
 * @property {Array<Auction>} auctions List of active auctions. 1000 entries max if only fetched single page.
 *
 * -----
 *
 * @typedef Auction
 * @property {string} uuid UUID
 * @property {string} auctioneer UUID
 * @property {string} profile_id UUID
 * @property {Array<string>} coop Array of UUIDs
 * @property {number} start
 * @property {number} end
 * @property {string} item_name Item name with reforges.
 * @property {string} item_lore Item lore(description), it includes enchantments and hot potato books.
 * @property {string} extra ??? (use it with attention, since there is "Bow Bow" and something)
 * @property {Category} category Item category
 * @property {Tier} tier Item rarity
 * @property {number} starting_bid Starting bid, 10 is supposed minimum but 1 is possible. (when selling dirts, etc)
 * @property {string} item_bytes Base64 encoded string. Actual type is NBT when you decode.
 * @property {boolean} claimed Default: false
 * @property {Array<string>} claimed_bidders Array of UUIDs. Default: Empty array
 * @property {number} highest_bid_amount Highest bid. Default: 0
 * @property {Array<Bid>} bids All bids made to this auction. Default: Empty array
 *
 * -----
 *
 * @typedef { "armor" | "blocks" | "misc" | "weapon" | "consumables" | "accessories" } Category
 *
 * -----
 *
 * @typedef { "COMMON" | "UNCOMMON" | "RARE" | "EPIC" | "LEGENDARY" | "SPECIAL" } Tier
 *
 * -----
 * 
 * @typedef Bid
 * @property {string} auction_id
 * @property {string} bidder UUID
 * @property {string} profile_id UUID
 * @property {number} amount how much they wasted into auction, overall.
 * @property {number} timestamp
 */

class Util {
  /**
   * @param {string} resource
   * @param {string} key API key generated from in-game
   * @param {number} page Page number
   * @returns {APIResponse} API Response
   */
  async get(resource, key, page) {
    return await fetch(`${BASE_URL}/${resource}?key=${key}${page && !isNaN(Number.parseInt(page)) ? `&page=${page}` : ''}`).then(res => res.json())
  }
}

module.exports = { Util }
