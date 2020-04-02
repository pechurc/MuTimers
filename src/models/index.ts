import { Sequelize } from 'sequelize'

import Channel from './Channel';
import EventBoss from './EventBoss';
import EventBossServer from './EventBossServer';

// Open database connection
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './data/database.sqlite'
  });

let models = [ Channel, EventBoss, EventBossServer ]
models.forEach(model => model.initialize(sequelize))

Channel.hasMany(EventBoss, {onDelete: 'cascade', hooks: true});
EventBoss.belongsTo(Channel);

EventBoss.hasMany(EventBossServer, {onDelete: 'cascade', hooks: true});
EventBossServer.belongsTo(EventBoss);

sequelize.sync({ })

export {sequelize as Database, Channel, EventBoss, EventBossServer}