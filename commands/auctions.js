const { Command } = require('bot-framework')
const util = require('../src/util')
const cache = require('../src/cache')
const config = require('../config.yml')
const { RichEmbed } = require('discord.js')

module.exports = class extends Command {
  constructor() {
    super('auctions', { alias: ['ah', 'auction'], args: ['<Player>'] })
  }

  async run(msg, lang, args) {
    if (!args[1]) return msg.channel.send('Usage: s!auction <player>')
    const message = await msg.channel.send('Searching player...')
    const player = args[1].length <= 16 ? await util.getPlayer(config.apiKey, args[1], false) : await util.getPlayer(config.apiKey, args[1], true)
    if (player == null) return msg.channel.send('Couldn\'t find player!')
    await message.edit('Fetching auctions, please wait... (It may takes up to 3 minutes!)')
    try { // eslint-disable-line
      const auctions = (await util.getAllSkyblockAuctions(config.apiKey)).filter(a => a.end > Date.now() && a.auctioneer === player.uuid)
      const embed = new RichEmbed()
      embed.setTitle(`${player.displayname}'s auctions`)
      embed.setTimestamp((await cache.getRawCache('skyblock/auctions/all')).lastUpdated)
      embed.setColor([0,255,0])
      embed.setFooter('All auctions are updated every 1 hour | Last updated: ')
      if (auctions.length <= 0) {
        embed.setColor([255,0,0])
        embed.setDescription('This player doesn\'t have any active auctions!')
      } else {
        auctions.forEach(auction => {
          embed.addField(util.stripColor(auction.item_name), `${util.stripColor(auction.item_lore)}\n\nAuction ID: ${auction.uuid}\nHighest Bid: ${auction.highest_bid_amount.toLocaleString()} coins\nBids: ${auction.bids.length}`)
        })
      }
      message.edit(embed)
    } catch (e) {
      message.edit(`An error occurred while fetching auctions! (${e})`)
      throw e
    }
  }
}
