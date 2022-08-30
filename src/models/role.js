const {DataTypes} = require('sequelize')
const db = require('../config/database')

const Role = db.define('Role',{
    rol :{
        type: DataTypes.STRING,
    },
})

module.exports = Role;