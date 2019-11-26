const { Command } = require('bot-framework')
const util = require('../src/util')
const cache = require('../src/cache')
const config = require('../config.yml')
const { RichEmbed } = require('discord.js')

module.exports = class extends Command {
  constructor() {
    super('profiles', { args: ['<Player>'] })
  }

  async run(msg, lang, args) {
    if (!args[1]) return msg.channel.send('Usage: s!profiles <player>')
    const message = await msg.channel.send('Searching player...')
    const player = args[1].length <= 16 ? await util.getPlayer(config.apiKey, args[1], false) : await util.getPlayer(config.apiKey, args[1], true)
    if (player == null) return msg.channel.send('Couldn\'t find player!')
    const embed = new RichEmbed()
    embed.setTitle(`${player.displayname}`)
    embed.setTimestamp((await cache.getRawCache(`player:${args[1]}`)).lastUpdated)
    embed.setColor([0,255,0])
    embed.setFooter('Player is updated every 1 day | Last updated for this player: ')
    const profiles = Object.values(player.stats.SkyBlock.profiles)
    if (profiles.length <= 0) {
      embed.setColor([255,0,0])
      embed.setDescription('This player didn\'t play SkyBlock yet!')
    } else {
      profiles.forEach(profile => {
        embed.addField(profile.cute_name, `Profile ID: ${profile.profile_id}`)
      })
    }
    message.edit(embed)
  }
}
