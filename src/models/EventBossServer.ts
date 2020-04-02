'use strict';
import {Sequelize, Model, DataTypes} from 'sequelize';

// for enums:
class EventBossServer extends Model {

    public serverId!: number;
    public killDate!: Date;
    public nextSpawnDate!: Date;

    public id!: number;

    public createdAt!: Date;
    public updatedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        this.init({
            serverId: DataTypes.NUMBER,
            killDate: DataTypes.DATE,
            nextSpawnDate: DataTypes.DATE
        }, { sequelize: sequelize })
    }
}

export default EventBossServer;