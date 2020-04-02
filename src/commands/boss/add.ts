import { Command } from "discord-akairo";
import ChannelService from "../../services/Channel";
import EventBossService from "../../services/EventBoss";
const timestring = require("timestring");

class AddBossCommand extends Command {
  constructor() {
    super("addBoss", {
      aliases: ["addBoss"],
      category: "boss",
      args: [
        {
          id: "name",
          type: "uppercase"
        },
        {
          id: "spawnTime",
          type: "string"
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

      let tiempoRespawn;
      try {
        tiempoRespawn = timestring(args.spawnTime, "m");
      } catch (e) {
        throw new Error(
          `\"${args.spawnTime}\" No es un formato valido para el tiempo de respawn`
        );
      }

      await EventBossService.createEventBoss({
        name: args.name,
        spawnTime: tiempoRespawn,
        channelId: message.channel.id
      });

      message.channel.send(`Boss registrado [${args.name}][${tiempoRespawn}]`);
    } catch (e) {
      message.channel.send(e.message);
    }
  }
}

module.exports = AddBossCommand;
