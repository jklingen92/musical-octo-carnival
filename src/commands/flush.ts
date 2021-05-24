import { Message } from "discord.js";
import { nomChannelName } from "../constants";

export const flush = async (
  message: Message,
  body: string = "",
  Nominations
) => {
  let nomChannel = message.guild.channels.cache.find(c => c.name == nomChannelName)
  return Promise.all([
    nomChannel ? nomChannel.delete() : null,
    Nominations.sync({force: true})
  ]) 
}