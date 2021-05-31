const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrpyt = require('bcrypt');
// create a User model
class User extends Model {
    checkPassword(loginPW) {
        return bcrpyt.compareSync(loginPW, this.password);
    }
}

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
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrpyt.hash(newUserData.password, 10);
                return;            
        },
        async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrpyt.hash(updatedUserData.password, 10);
        }
    },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
      
    }
);


module.exports = User;
