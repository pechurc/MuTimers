import { Command } from "discord-akairo";
import ChannelService from "../../services/Channel";

class UnregisterChannelCommand extends Command {
  constructor() {
    super("unregisterChannel", {
      aliases: ["unregisterChannel"],
      category: "channel"
    });
  }

  async exec(message, args) {
    try {
      if (!(await ChannelService.isChannelRegistered(message.channel.id))) {
        throw new Error("El canal no esta registrado!");
      }

      let channel = await ChannelService.deleteChannel(message.channel.id);

      if (channel) {
        message.reply("El canal se elimino correctamente");
      }
    } catch (e) {
      message.reply(e.message);
    }
  }
}

module.exports = UnregisterChannelCommand;
