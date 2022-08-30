const {DataTypes} = require('sequelize')
const db = require('../config/database')

const Usuario = db.define('Usuario',{
    username :{
        type: DataTypes.STRING,
        allowNull: false
    },
    password :{
        type: DataTypes.STRING,
    },
    email :{
        type: DataTypes.STRING,
       
    },
    estado :{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    rol :{
        type: DataTypes.STRING,
    },
})

module.exports = Usuario;