import { Channel, EventBoss, EventBossServer } from '../models';
import { IEventBoss } from '../interfaces/IEventBoss';
import { IEventBossServer } from '../interfaces/IEventBossServer';
import date from 'date-and-time';
import { WhereOptions } from 'sequelize/types';

async function getEventBoss(where: WhereOptions): Promise<EventBoss> {
    return await EventBoss.findOne({
        attributes: ['id','name', 'spawnTime'],
        order: [['id', 'ASC']],
        where: where,
        include: [Channel]
    })
}

async function deleteEventBoss(id: number): Promise<number> {
    return await EventBoss.destroy({
        where: {
            id: id
        }
    })
}

async function createEventBoss(dto: IEventBoss): Promise<EventBoss> {
    
    try {
        let channel = await Channel.findByPk(dto.channelId);

        if (!channel) {
            throw new Error("El canal no existe");
        }
    
        let boss = await EventBoss.findOne({
            where: {
                name: dto.name,
                ChannelId: channel.id
            }
        });
            
        if (boss) {
            throw Error("El boss ya existe en este servidor");
        }
        
        let eventBossServers: Array<IEventBossServer> = [];
    
        let fecha = new Date(Date.now());
        let fechaProximo = date.addMinutes(fecha, dto.spawnTime);
    
        for (let index = 1; index <= channel.serverQty; index++) {
            eventBossServers.push({
                serverId: index,
                killDate: fecha,
                nextSpawnDate: fechaProximo
            })         
        }
    
        let eventBoss = await EventBoss.create({
                name: dto.name,
                spawnTime: dto.spawnTime,
                ChannelId: channel.id, 
                EventBossServers: eventBossServers
            },
            {
                include: [
                    {model: EventBossServer, as: 'EventBossServers'}
                ]
            }
        );
    
        return eventBoss;
    } catch(e) {
        throw e;
    }    
}

export default {getEventBoss: getEventBoss, createEventBoss: createEventBoss, deleteEventBoss: deleteEventBoss }