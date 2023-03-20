'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('skills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id:{ 
        type: DataTypes.UUID,
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('skills');
  }
};