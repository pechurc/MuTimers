import { Channel } from '../models';
import { IChannel } from '../interfaces/IChannel';

async function getChannels(): Promise<any[]> {
    return await Channel.findAll({
        attributes: ['id', 'name', 'active', 'serverQty'],
        order: [['id', 'ASC']]
    })
}

async function createChannel(dto: IChannel): Promise<Channel> {

    let channel = await Channel.create({
        id: dto.id,
        name: dto.name,
        serverQty: dto.serverQty
    });

    return channel;
}

async function deleteChannel(id: string): Promise<number> {
    return await Channel.destroy({
        where: {
            id: id
        }
    })
}

async function getChannel(id: string): Promise<Channel> {
    
    let channel = await Channel.findByPk(id);

    return channel;
}

async function isChannelRegistered(id: string): Promise<Boolean> {

    let channel = await Channel.findByPk(id);

    return channel !== null;
}

export default {  isChannelRegistered: isChannelRegistered, getChannels: getChannels, createChannel: createChannel, getChannel: getChannel, deleteChannel: deleteChannel }