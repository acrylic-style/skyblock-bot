const { Command } = require('bot-framework')
const util = require('../src/util')
const cache = require('../src/cache')
const config = require('../config.yml')
const { RichEmbed } = require('discord.js')

module.exports = class extends Command {
  constructor() {
    super('findauctions', { alias: ['findah', 'findauction'], args: ['[word] [!exact] [!endingSoon | !lowestBid | !highestBid | !mostBids] [[!weapons] [!armor] [!accessories] [!consumables] [!blocks] [!misc]]'] })
  }

  async run(msg, lang, args) {
    const exact = args.includes('!exact')
    const validSortOpts = ['!endingSoon', '!lowestBid', '!highestBid', '!mostBids']
    const validCategories = ['!weapons', '!armor', '!accessories', '!consumables', '!blocks', '!misc']
    const sortOptions = args.filter(a => validSortOpts.includes(a))
    const categories = args.filter(a => validCategories.includes(a))
    args = args.filter(a => !a.startsWith('!')).splice(1).join(' ')
    if (sortOptions.length >= 2) return msg.channel.send('You may specify only 1 sort options.')
    const sortOption = sortOptions[0]
    const message = await msg.channel.send('Fetching auctions, please wait... (It may takes up to 3 minutes!)')
    try { // eslint-disable-line
      let auctions = (await util.getAllSkyblockAuctions(config.apiKey)).filter(a => a.end > Date.now())
      if (args) {
        if (exact) {
          auctions = auctions.filter(a => util.stripColor(a.item_name) === args)
        } else {
          auctions = auctions.filter(a => util.stripColor(a.item_name).includes(args))
        }
      }
      if (!sortOptions || sortOption === '!highestBid') {
        auctions = auctions.sort((a, b) => b.highest_bid_amount - a.highest_bid_amount)
      } else if (sortOption === '!lowestBid') {
        auctions = auctions.sort((a, b) => a.highest_bid_amount - b.highest_bid_amount)
      } else if (sortOption === '!mostBids') {
        auctions = auctions.sort((a, b) => b.bids - a.bids)
      } else if (sortOption === '!endingSoon') {
        auctions = auctions.sort((a, b) => a.end - b.end)
      }
      const tempAuctions = []
      if (categories.includes('!weapons')) tempAuctions.push(...auctions.filter(a => a.category === 'weapon'))
      if (categories.includes('!armor')) tempAuctions.push(...auctions.filter(a => a.category === 'armor'))
      if (categories.includes('!accessories')) tempAuctions.push(...auctions.filter(a => a.category === 'accessories'))
      if (categories.includes('!consumables')) tempAuctions.push(...auctions.filter(a => a.category === 'consumables'))
      if (categories.includes('!blocks')) tempAuctions.push(...auctions.filter(a => a.category === 'blocks'))
      if (categories.includes('!misc')) tempAuctions.push(...auctions.filter(a => a.category === 'misc'))
      auctions.push(...tempAuctions)
      const embed = new RichEmbed()
      embed.setTitle('Auctions Browser')
      embed.setTimestamp((await cache.getRawCache('skyblock/auctions/all')).lastUpdated)
      embed.setColor([0,255,0])
      embed.setFooter('All auctions are updated every 1 hour | Last updated: ')
      if (auctions.length <= 0) {
        embed.setColor([255,0,0])
        embed.setDescription('There arne\'t active auctions with specified filter!')
      } else {
        auctions.length = 20
        auctions = auctions.filter(_=>_)
        let strings = 100
        await message.edit('Sorting auctions... (It may takes up to 4 minutes!)')
        for (let i = 0; i < auctions.length; i++) {
          const auction = auctions[i]
          const player = await util.getPlayer(config.apiKey, auction.auctioneer, true)
          const desc = `${util.stripColor(auction.item_lore)}


Seller: ${util.stripColor(player.prefix || util.convertRank(player.rank || player.packageRank || player.newPackageRank))} ${player.displayname}
Auction ID: ${auction.uuid}
Starting Bid: ${auction.starting_bid.toLocaleString()} coins
Highest Bid: ${auction.highest_bid_amount.toLocaleString()} coins
Bids: ${auction.bids.length}
Ends in: ${util.dateDiff(Date.now(), auction.end)}`
          strings = strings + desc.length + util.stripColor(auction.item_name).length
          if (strings < 6000) embed.addField(util.stripColor(auction.item_name), desc); else break
        }
      }
      message.edit(embed)
    } catch (e) {
      message.edit(`An error occurred while fetching auctions! (${e})`)
      throw e
    }
  }
}
