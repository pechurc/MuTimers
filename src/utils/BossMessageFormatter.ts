import { EventBossServer, EventBoss } from "../models";
import { MessageEmbed } from "discord.js";
import date from "date-and-time";

function formatBossMessage (servidores: Array<EventBossServer>, boss: EventBoss ): MessageEmbed {
      
    const embed = new MessageEmbed()
    .setTitle(boss.name)
    .setColor(0xff0000);
  
    servidores.forEach((servidor) => {
      let fieldName = "Servidor " + servidor.serverId;
      if (servidor.nextSpawnDate < new Date(Date.now())) {
        fieldName += " [No Actualizado]";
      }
      embed.addField(fieldName, `${formatFecha(servidor.killDate)} > ${formatFecha(servidor.nextSpawnDate)}`);
    });
  
    return embed;
  }

  function formatFecha(fecha: Date): string {

    const formato = "DD/MM/YYYY HH:mm";

    return date.format(fecha,formato);
  }

  export default formatBossMessage;