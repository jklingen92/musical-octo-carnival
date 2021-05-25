import { Message, TextChannel } from "discord.js"
import { nomChannelName } from "./constants" 

export async function getNominationsChannel(message: Message) {
  let nomChannel = message.guild.channels.cache.find(c => c.name == nomChannelName)
  if (nomChannel && nomChannel.isText()) {
    return nomChannel
  } else {
    if (nomChannel) {
      return nomChannel.delete().then(
        _ => makeNomChannel(message)
      )
    } else {
      return makeNomChannel(message)
    }
  }
  
}

async function makeNomChannel(message: Message) {
  return message.guild.channels.create(
    nomChannelName,
    {
      type: "text",
      permissionOverwrites: [
        {
          id: message.guild.roles.everyone,
          deny: ["SEND_MESSAGES"]
        },
        {
          id: message.guild.roles.cache.find(r => r.name === "Musical Octo Carnival"),
          allow: ["SEND_MESSAGES"]
        }
      ]
    })
}