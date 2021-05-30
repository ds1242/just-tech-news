const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create a User model
class User extends Model {}

// define table columns and configuration 
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            // equivalent of SQL's 'NOT NULL' option
            allowNull: false,
            // setup primary key
            primaryKey: true,
            // turn on autoincrement 
            autoIncrement: true
        },
           // define a username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // define password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // set required length to at least four characters long
                len:[4]
            }
        }
    },
    {
        // table config options go here 

        // pass our inmported sequelize connection 
        sequelize,
        // don't automatically create createAt/updatedAt timestamp fields
        timestamps: false,
        // don't pluralize name of database table 
        freezeTableName: true,
        // user underscore instead of camelcase 
        underscored: true,
        // make it so the model name stays lowercase
        modelName: 'user'
    }
);

module.exports = User;