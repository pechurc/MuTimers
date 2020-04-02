const { AkairoClient, CommandHandler } = require('discord-akairo');
import killDate from './types/KillDate';

class MuTimers extends AkairoClient {
    constructor() {
        super({
            ownerID: '265692725955919872',
        }, {
            // Options for discord.js goes here.
        });

        let commandHandler = new CommandHandler(this, {
            directory: __dirname + '/commands/',
            prefix: '!' // or ['?', '!']
        });

        commandHandler.resolver.addType('killDate', killDate);

        commandHandler.loadAll();
    }
}

export default MuTimers;