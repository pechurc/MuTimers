'use strict';
import {Sequelize, Model, DataTypes} from 'sequelize';

// for enums:
class EventBoss extends Model {

    public name!: string;
    public spawnTime!: number;

    public id!: number;

    public createdAt!: Date;
    public updatedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        this.init({
            name: DataTypes.STRING,
            spawnTime: DataTypes.NUMBER
        }, { sequelize: sequelize })
    }
}

export default EventBoss;