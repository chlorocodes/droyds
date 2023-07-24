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
        name: '!translate',
        value:
          'When this is used as a reply to any message, it will reply with a translation of the parent message'
      },
      {
        name: '!translate [text]',
        value: 'Translates the provided [text]'
      },
      {
        name: '!translate~[number]',
        value: 'Performs a multitranslation of the last [number] messages'
      },
      {
        name: '!fact',
        value: 'Replies with a random fact'
      },
      {
        name: '!roast',
        value:
          'When used as a reply to a message, it will reply with a roast to the author of the parent message. If this message is used standalone, it will just post a random roast not directed at anyone.'
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
