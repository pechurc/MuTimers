import { Command } from "discord-akairo";
import ChannelService from "../../services/Channel";

class RegisterChannelCommand extends Command {
  constructor() {
    super("registerChannel", {
      aliases: ["registerChannel"],
      category: "channel",
      args: [
        {
          id: "serverQty",
          type: "number"
        }
      ]
    });
  }

  async exec(message, args) {
    try {
      if (!(await ChannelService.isChannelRegistered(message.channel.id))) {
        throw new Error("El canal ya esta registrado!");
      }

      let channel = await ChannelService.createChannel({
        id: <string>message.channel.id,
        serverQty: args.serverQty,
        name: message.channel.name
      });

      if (channel) {
        message.reply("El canal se registro correctamente");
      }
    } catch (e) {
      message.reply(e.message);
    }
  }
}

module.exports = RegisterChannelCommand;
