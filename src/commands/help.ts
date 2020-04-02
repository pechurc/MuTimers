import { Command } from "discord-akairo";
import { MessageEmbed } from "discord.js";

class HelpCommand extends Command {
  constructor() {
    super("help", {
      aliases: ["help"]
    });
  }

  exec(message) {
    const embed = new MessageEmbed();

    embed.setColor(0xff0000);
    embed.setTitle("Ayuda");
    embed.addField(
      "!registerChannel [numeroSubservers]",
      "Registra un nuevo canal y setea la cantidad de subservidores que posee el server"
    );
    embed.addField(
      "!addBoss [nombre] [tiempoSpawn]",
      "Agrega un nuevo boss, el tiempo de spawn tiene el siguiente formato 1h15m donde 'h' es la cantidad de horas y 'm' la cantidad de minutos, puede ir solo horas o minutos"
    );
    embed.addField(
      "!killBoss [nombre] [numeroDeServidor] [horario]",
      "Marca como matado a un boss en el servidor que se especifica, el horario es opcional, si no se especifica se utiliza la fecha actual, para especificarlo tiene el siguiente formato DD/MM/AAAATHH:MM"
    );
    embed.addField(
      "!boss [nombre]",
      "Regresa los horarios del boss especificado"
    );
    embed.addField("!delBoss [nombre]", "Borra el boss especificado");
    embed.addField(
      "!unregisterChannel",
      "Elimina el canal y elimina toda la informacion relacionada"
    );

    message.channel.send(embed);
  }
}

module.exports = HelpCommand;
