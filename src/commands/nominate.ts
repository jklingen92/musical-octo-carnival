import { Message } from "discord.js";
import { getNominationsChannel } from "../utils"

export const nominate = async (
  message: Message,
  body: string = "",
  Nominations
) => {
  const nomChannel = await getNominationsChannel(message)
  const numNoms = await Nominations.findAll()
  if (numNoms.length === 10) {
    return message.reply("Nominations are closed!")
  }

  if (!body.length) {
    message.reply("...go on...")
    return
  } else {
    try {
      const nomination = await Nominations.create({
        name: body,
        username: message.author.username,
      });
      nomChannel.send(`${nomination.username} nominated ${body}`);
      if (numNoms === 9) {
        message.channel.send("Nominations are now closed!")
        nomChannel.send("Nominations are now closed!")
      }
      return
    }
    catch (e) {
      if (e.name === 'SequelizeUniqueConstraintError') {
        const nomination = await Nominations.findOne({ where: { name: body } });
        return message.reply(`${nomination.username} already nominated ${body}!`);
      }
      return message.reply(`Something went wrong with your nomination: ${e.name}.`);
    }
  } 
}