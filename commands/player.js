const { Command } = require('bot-framework')
const util = require('../src/util')
const cache = require('../src/cache')
const config = require('../config.yml')
const { RichEmbed } = require('discord.js')

module.exports = class extends Command {
  constructor() {
    super('player', { args: ['<Player>'] })
  }

  async run(msg, lang, args) {
    if (!args[1]) return msg.channel.send('Usage: s!player <player>')
    const message = await msg.channel.send('Searching player...')
    const player = args[1].length <= 16 ? await util.getPlayer(config.apiKey, args[1], false) : await util.getPlayer(config.apiKey, args[1], true)
    if (player == null) return msg.channel.send('Couldn\'t find player!')
    const embed = new RichEmbed()
    embed.setTitle(`${util.stripColor(player.prefix || util.convertRank(player.rank || player.packageRank || player.newPackageRank))} ${player.displayname}`)
    embed.setTimestamp((await cache.getRawCache(`player:${args[1]}`)).lastUpdated)
    embed.setColor([0,255,0])
    embed.setURL(`https://hypixel.net/player/${player.displayname}`)
    embed.setFooter('Player is updated every 1 day | Last updated for this player: ')
    embed.addField('Rank', `${player.rank ? `${player.rank} (` : ''}${util.convertRank(player.packageRank || player.newPackageRank)}${player.rank ? ')' : ''}`)
    embed.addField('Level', player.networkExp === undefined ? '?' : `${util.getLevel(player.networkExp)} (Exact: ${util.getExactLevel(player.networkExp)})`, true)
    embed.addField('Experience', player.networkExp === undefined ? '?' : player.networkExp.toLocaleString(), true)
    embed.addField('Karma', player.karma === undefined ? '?' : player.karma.toLocaleString())
    embed.addField('First Login (in UTC)', new Date(player.firstLogin).toLocaleString('en-US', { timeZone: 'UTC' }))
    embed.addField('Last Login (in UTC)', new Date(player.lastLogin).toLocaleString('en-US', { timeZone: 'UTC' }))
    embed.addField('Last Logout (in UTC)', new Date(player.lastLogout).toLocaleString('en-US', { timeZone: 'UTC' }))
    embed.addField('Minecraft Version', player.mcVersionRp)
    embed.addField('Glowing', player.battlePassGlowStatus ? 'Yes' : 'No')
    message.edit(embed)
  }
}
