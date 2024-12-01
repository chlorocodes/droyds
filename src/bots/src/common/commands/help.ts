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
        name: '!avatar, !av',
        value: 'Replies with an image of your avatar'
      },
      {
        name: '!avatar @user, !av @user',
        value: "Replies with an image of the @user's avatar"
      },
      {
        name: '!archive',
        value:
          'Generates a screenshot of the last few messages in the current channel, and then posts it in the #archive channel.'
      },
      {
        name: '!translate',
        value:
          'When this is used as a reply to any message, it will reply with a translation of the parent message. When its used as a standalone message, it will just translate the previous message.'
      },
      {
        name: '!translate [text]',
        value: 'Translates the provided [text]. Ex: "!translate merci boucoup"'
      },
      {
        name: '!translate~[number]',
        value:
          'Performs a multitranslation of the last [number] messages. This can also be used as a reply to a specific message to set the starting point. Ex: !translate~5'
      },
      {
        name: '!fact',
        value: 'Replies with a random fact.'
      },
      {
        name: '!compliment',
        value:
          'When used as a reply to a message, it will reply with a compliment to the author of the parent message. If this message is used standalone, it will just post a random compliment not directed at anyone.'
      },
      {
        name: '!compliment~[number]',
        value: 'Generates a specified amount of compliments. Ex: !compliment~5'
      },
      {
        name: '!compliment~[number] [user]',
        value:
          'Generates a specified amount of compliments for the specified user'
      },
      {
        name: '!roast',
        value:
          'When used as a reply to a message, it will reply with a roast to the author of the parent message. If this message is used standalone, it will just post a random roast not directed at anyone.'
      },
      {
        name: '!mock',
        value:
          'Reply to a message with this command and it will mock it using tHiS TYpE oF cAsInG.'
      },
      {
        name: '!joke',
        value:
          'Replies with a random joke. (Warning: the jokes are not vetted and may be racist/sexist)'
      },
      {
        name: '!snitch',
        value:
          "This command can be used as a reply to another message, and it alerts the authorities of that message's contents. Otherwise, it just tells the authorities to look at recent messages."
      },
      {
        name: '!abuse [user] [new username]',
        value:
          'Abuses a user of the server by changing their username to a new name. Currently, only Chloro can use this command but this will be updated soon. Ex: !abuse @o_kayy LymeFanboi'
      },
      {
        name: '!pickup',
        value:
          'Replies with a pickup line. When used as a reply, it will direct the pickup line at the person.'
      },
      {
        name: '!pickup~[number]',
        value: 'Generates a specified amount of pickuplines. Ex: !pickup~5'
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
        name: '!wat, !wut, !wha, !huh, !bruh',
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
        name: '!stupid, !idiot, !moron, !dumb, !dumbass',
        value: 'Replies with a picture of Amado calling you stupid.'
      },
      {
        name: '!woot',
        value: 'Replies with a picture of Daemon basically calling you stupid.'
      },
      {
        name: '!bitchPls, !bitchpls, !bitchPlease, !bitchplease',
        value:
          'Replies with a picture of Daemon chillin without giving any fucks'
      }
    ]
  }

  message.channel.send({
    embeds: [embed]
  })
}
