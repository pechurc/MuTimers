import { EventBoss, EventBossServer } from '../models';
import date from 'date-and-time';
import { WhereOptions } from 'sequelize/types';

async function getEventBossServer(where: WhereOptions) {

    return EventBossServer.findAll({where: where});
}

async function updateEventBossServer(eventBoss: EventBoss, serverId: number, killedDate: Date) {

    try {
        let eventBossServer = await EventBossServer.findOne({
            where: {
                EventBossId: eventBoss.id,
                serverId: serverId
            }
        });

        if (!eventBossServer) {
            throw new Error("Boss no encontrado");
        }

        let nextSpawnDate = date.addMinutes(killedDate, eventBoss.spawnTime);
        await EventBossServer.update({
            killDate: killedDate,
            nextSpawnDate: nextSpawnDate
        }, {
            where: {
                EventBossId: eventBoss.id,
                serverId: serverId
            }
        })

    } catch (e) {
        throw e;
    }
}

export default {updateEventBossServer: updateEventBossServer, getEventBossServer: getEventBossServer}