'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, {foreignKey:'user_id', as: 'user'}) //as:'user' =>when you trying to get data with from an model, Data would be Coming in Model Name { User=[] } array and we want that data in {user=[]} user as in small case   
    }

    toJSON(){
      return {...this.get(), id:undefined}
    }
  }
  Skill.init({
    user_id:{ type: DataTypes.UUID,
    allowNull: false
  },
    expertise:{
      type:DataTypes.STRING,
      allowNull:false
    } ,
    skill_1: {
      type:DataTypes.STRING,
      allowNull:false
    } ,
    skill_2: {
      type:DataTypes.STRING,
      allowNull:false
    } ,
    skill_3: {
      type:DataTypes.STRING,
      allowNull:false
    } ,
  }, {
    sequelize,
    tableName:'skills',
    modelName: 'Skill',
  });
  return Skill;
};