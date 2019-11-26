const { Command } = require('bot-framework')
const util = require('../src/util')
const cache = require('../src/cache')
const config = require('../config.yml')
const { RichEmbed } = require('discord.js')

module.exports = class extends Command {
  constructor() {
    super('profile', { args: ['<profile ID>'] })
  }

  async run(msg, lang, args) {
    if (!args[1]) return msg.channel.send('Usage: s!profile <profile ID>')
    const embed = new RichEmbed()
    embed.setTitle('SkyBlock Profile')
    embed.setDescription('Fetching profile...')
    const message = await msg.channel.send(embed)
    embed.setColor([0,255,0])
    const data = await util.getSkyBlockProfile(config.apiKey, args[1])
    if (data) {
      embed.setDescription('')
      embed.setFooter('Profile is updated every 1 hour | Last updated for this profile: ')
      embed.setTimestamp((await cache.getRawCache(`sbprofile:${args[1]}`)).lastUpdated)
      const keys = Object.keys(data.members)
      const array = Object.values(data.members)
      for (let i = 0; i < array.length; i++) {
        const uuid = keys[i]
        const player2 = await util.getPlayer(config.apiKey, uuid, true)
        const sbPlayer = array[i]
        const armorContents = (await util.decodeNBT(sbPlayer.inv_armor.data)).value.i.value.value
        embed.addField(`${player2.displayname}`, `Armor:
 - Head: ${armorContents[0].tag ? util.stripColor(armorContents[0].tag.value.display.value.Name.value) : 'None'}
 - Chestplate: ${armorContents[1].tag ? util.stripColor(armorContents[1].tag.value.display.value.Name.value) : 'None'}
 - Leggings: ${armorContents[2].tag ? util.stripColor(armorContents[2].tag.value.display.value.Name.value) : 'None'}
 - Boots: ${armorContents[3].tag ? util.stripColor(armorContents[3].tag.value.display.value.Name.value) : 'None'}\n
Purse Coins: ${Math.round(sbPlayer.coin_purse*100)/100}
Crafted minions: ${sbPlayer.crafted_generators.length}\n
Skills: ${sbPlayer.experience_skill_farming === null || sbPlayer.experience_skill_farming === undefined ? '<Private>' : `
 - Farming: ${Math.round(sbPlayer.experience_skill_farming)}
 - Mining: ${Math.round(sbPlayer.experience_skill_mining)}
 - Combat: ${Math.round(sbPlayer.experience_skill_combat)}
 - Foraging: ${Math.round(sbPlayer.experience_skill_foraging)}
 - Fishing: ${Math.round(sbPlayer.experience_skill_fishing)}
 - Enchanting: ${Math.round(sbPlayer.experience_skill_enchanting)}
 - Alchemy: ${Math.round(sbPlayer.experience_skill_alchemy)}
 - Carpentry: ${Math.round(sbPlayer.experience_skill_carpentry)}
 - Runecrafting: ${Math.round(sbPlayer.experience_skill_runecrafting)}\n`}
Completed Tutorials: ${sbPlayer.tutorial.length}
Visited Zones: ${sbPlayer.visited_zones.length}
Completed Quests: ${Object.values(sbPlayer.quests).filter(q => q.status === 'COMPLETE').length}
Ongoing(Active) Quests: ${Object.values(sbPlayer.quests).filter(q => q.status === 'ACTIVE').length}
Collection Unlocked: ${sbPlayer.collection ? Object.values(sbPlayer.collection).length : '<Private>'}`)
      }        
    } else {
      embed.setColor([255,0,0])
      embed.setDescription('Couldn\'t find profile!')
    }
    message.edit(embed)
  }
}
