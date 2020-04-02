import { Command } from "discord-akairo";
import ChannelService from "../../services/Channel";
import EventBossService from "../../services/EventBoss";
import { EventBoss } from "../../models";
import EventBossServerService from "../../services/EventBossServer";
import formatBossMessage from "../../utils/BossMessageFormatter";

class InfoBossCommand extends Command {
  constructor() {
    super("boss", {
      aliases: ["boss", "info"],
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

module.exports = InfoBossCommand;
