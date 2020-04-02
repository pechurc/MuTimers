import { Command } from "discord-akairo";
import ChannelService from "../../services/Channel";
import EventBossService from "../../services/EventBoss";
import EventBossServerService from "../../services/EventBossServer";
import { EventBoss } from "../../models";
import formatBossMessage from "../../utils/BossMessageFormatter";

class KillBossCommand extends Command {
  constructor() {
    super("killBoss", {
      aliases: ["killBoss"],
      category: "boss",
      args: [
        {
          id: "name",
          type: "uppercase"
        },
        {
          id: "serverId",
          type: "string"
        },
        {
          id: "killedDate",
          type: "killDate"
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

      if (!args.killedDate) {
        throw new Error("Formato de fecha incorrecto");
      }

      let eventBoss: EventBoss = await EventBossService.getEventBoss({
        name: args.name,
        ChannelId: message.channel.id
      });
      
      if (!eventBoss) {
        throw new Error("Boss no encontrado");
      }

      await EventBossServerService.updateEventBossServer(
        eventBoss,
        args.serverId,
        args.killedDate
      );

      let servidores = await EventBossServerService.getEventBossServer({
        EventBossId: eventBoss.id
      });

      let embed = formatBossMessage(servidores, eventBoss);

      message.channel.send(embed);
    } catch (e) {
      message.channel.send(e.message);
    }
  }
}

module.exports = KillBossCommand;
