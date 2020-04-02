'use strict';
import {Sequelize, Model, DataTypes} from 'sequelize';

// for enums:
class Channel extends Model {

    public id!: string;
    public name!: string;
    public serverQty: number;
    
    public createdAt!: Date;
    public updatedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        this.init({
            id: { 
                type: DataTypes.STRING,
                primaryKey: true
            },
            name: DataTypes.STRING,
            serverQty: DataTypes.NUMBER
        }, { sequelize: sequelize })
    }
}

export default Channel;
