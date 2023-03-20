'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Skill}) {
      // define association here
      this.hasOne( Skill ,{foreignKey: 'user_id', as:'skills'})
    }
    /*//!For not showing particular field when sending and getting data [make that field undefined]*/
    //? toJSON(){
    //?   return {...this.get(), user_id:undefined}
    //? }
    
  }
  User.init({
    user_id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true
    }
    ,
    first_name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notNull:{msg:'User must have first name'},
        notEmpty:{msg:'First name must not be empty'}
      }
    },
    last_name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate :{
        notNull:{msg:'user must have last name'},
        notEmpty:{msg:'Last name must not be empty'}
      }
    },
    role: {
      type:DataTypes.STRING,
      allowNull:false,
      validate :{
        notNull:{msg:'user must have last name'},
        notEmpty:{msg:'Last name must not be empty'}
      }
    },
  }, {
    sequelize,
    tableName:'users',
    modelName: 'User',
  });
  return User;
};