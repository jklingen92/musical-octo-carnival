import { Message, MessageEmbed, GuildMember } from "discord.js";
import { nominate } from "./nominate";

export const open = async (
  message: Message,
  body: string = "Vote for your favorite:",
  Nominations,
) => {
  const nominations = await Nominations.findAll({ attributes: ['name'] });
  if (nominations.length === 0) {
    return message.reply("There are no nominations yet.")
  }
  const names = nominations.map(nomination => nomination.name)
  return message.channel.send(`/poll "${body}" ${names.map(n => `"${n}"`).join(" ")}`)
}