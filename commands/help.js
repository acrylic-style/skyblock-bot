const Discord = require('discord.js')
const { Command } = require('bot-framework')

module.exports = class extends Command {
  constructor() {
    super('help', { args: ['[Command]'] })
  }

  async run(msg, lang = require('../lang/en.json'), args, sendDeletable, prefix) {
    if (args[1]) {
      const { commands } = require('bot-framework/commands')
      const command = commands[args[1]]
      if (!command) return msg.channel.send(lang.no_command)
      const callback = p => {
        const nounderbar = p.replace(/([A-Z].*?)(_(.*?))/g, '$1 ')
        return nounderbar.replace(/\b[A-Z]{2,}\b/g, str => str.toLowerCase())
      }
      const embed = new Discord.RichEmbed()
        .setTitle('About this command')
        .setDescription(
          (lang.commands[args[1]] || ' - Not available information - ')
          + `\n\nUsage: <prefix>${args[1]} ${command.args !== [] ? command.args.join('\n') : ''}`
          + `\nAlias: ${command.alias !== [] ? command.alias.join('\n') : lang.no}`
          + `\nAllowed in: ${command.allowedIn.join(', ')}`
          + `\nRequired permissions for you: ${command.permission.bitfield ? command.permission.toArray(false).map(callback).join(', ') : 'None'}`
          + `\nIs special command: ${command.requiredOwner ? lang.yes : lang.no}`
          + `\nIs enabled: ${command.enabled ? lang.yes : lang.no}`)
        .setTimestamp()
        .setColor([0,255,0])
      return sendDeletable(embed)
    }
    const embed = new Discord.RichEmbed()
      .setTitle('List of commands')
      .addField(`${prefix}help`, lang['commands']['help'])
      .addField(`${prefix}auctions <Player>`, 'Shows list of player\'s active auctions')
      .addField(`${prefix}profiles <Player>`, 'Shows list of player\'s skyblock profiles')
      .addField(`${prefix}profile <Profile ID>`, 'Shows information for specified profile.')
      .addField(`${prefix}player <Player>`, 'Shows information for specified player.')
      .addField(`${prefix}version`, lang['commands']['version'])
      .addField('Note!', `\`${args[0]} [Command]\` for more help!`)
      .setColor([0,255,0])
    sendDeletable(embed)
  }
}
