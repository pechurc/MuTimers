import { Command } from "discord-akairo";
import ChannelService from "../../services/Channel";
import EventBossService from "../../services/EventBoss";
import date from "date-and-time";
import { EventBoss } from "../../models";
const timestring = require("timestring");

class DeleteBossCommand extends Command {
  constructor() {
    super("deleteBoss", {
      aliases: ["deleteBoss"],
      category: "boss",
      args: [
        {
          id: "name",
          type: "uppercase"
        }
      ]
    });
  }

  async exec(message, args) {
    try {
      // El canal esta registrado?
      if (!(await ChannelService.isChannelRegistered(message.channel.id))) {
        throw new Error("El canal no esta registrado!");
      }

      let eventBoss: EventBoss = await EventBossService.getEventBoss({
        name: args.name,
        ChannelId: message.channel.id
      });

      if (!eventBoss) {
        throw new Error(`El boss con el nombre ${args.name} no existe!`);
      }

      await EventBossService.deleteEventBoss(eventBoss.id);

      message.channel.send("Boss borrado!");
    } catch (e) {
      message.channel.send(e.message);
    }
  }
}

module.exports = DeleteBossCommand;
