import * as Discord from "discord.js";
import { nominate } from "./commands/nominate";
import { open } from "./commands/open";
import { flush } from "./commands/flush";

interface ICommand {
  callback: (
    message: Discord.Message,
    body,
    nominations
  ) => void;
  triggers: string[];
}

export const commands: { [key: string]: ICommand } = {
  nominate: {
    callback: nominate,
    triggers: ["nominate", "nom"],
  },
  open: {
    callback: open,
    triggers: ["open", "vote"],
  },
  flush: {
    callback: flush,
    triggers: ["flush", "clear"]
  }
}