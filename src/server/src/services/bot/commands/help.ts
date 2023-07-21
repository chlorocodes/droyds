import { Message, APIEmbed } from 'discord.js'

export async function help(message: Message) {
  const embed: APIEmbed = {
    title: 'Lyme commands',
    description: 'Here is the list of all commands you can use with Lyme.',
    color: 0xa3f55c,
    fields: [
      {
        name: '',
        value: '\u200B'
      },
      {
        name: 'Actions:',
        value: ''
      },
      {
        name: '--------------------------',
        value: ''
      },
      {
        name: '!translate [text]',
        value:
          'Translates some given text or it just translates the parent message when this command is used as a reply.'
      },
      {
        name: '!fact',
        value: 'Replies with a random fact'
      },
      {
        name: '!abuse [user] [new username]',
        value:
          'Abuses a user of the server by changing their username to a new name. Currently, only Chloro can use this command but this will be updated soon.'
      },
      {
        name: '',
        value: '\u200B'
      },
      {
        name: 'Text Commands',
        value: ''
      },
      {
        name: '--------------------------',
        value: ''
      },
      {
        name: '!cringidantes',
        value: 'Mocks the original "!confidantes" command.'
      },
      {
        name: '',
        value: '\u200B'
      },
      {
        name: 'Image Commands:',
        value: ''
      },
      {
        name: '--------------------------',
        value: ''
      },
      {
        name: '!wat, !wut, !huh, !bruh',
        value: 'Replies with a picture of Daemon being like "wtf".'
      },
      {
        name: '!powerscaling',
        value:
          'Replies with a picture of Daemon talking his shit about being #1.'
      },
      {
        name: '!man',
        value:
          'Replies with the popular picture of a horse having an existential crisis.'
      },
      {
        name: '!mirror',
        value:
          'Replies with a picture of Daemon telling you to go look at a mirror and cry.'
      },
      {
        name: '!stupid',
        value: 'Replies with a picture of Amado calling you stupid.'
      },
      {
        name: '!woot',
        value: 'Replies with a picture of Daemon basically calling you stupid.'
      },
      {
        name: '!bitchPls, !bitchplease',
        value:
          'Replies with a picture of Daemon chillin without giving any fucks'
      }
    ]
  }

  message.channel.send({
    embeds: [embed]
  })
}
