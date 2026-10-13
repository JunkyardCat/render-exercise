const {DataTypes,Model} = require('sequelize')
const {sequelize} = require('../util/db.cjs')

class Team extends Model {}

Team.init({
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  name:{
    type:DataTypes.INTEGER,
    allowNull:false,
    unique:true
  },
},{
  sequelize,
  underscored:true,
  timestamps:false,
  modelName:'team'
})

module.exports = Team
