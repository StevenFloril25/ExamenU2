const { Sequelize,Model, DataTypes } = require('sequelize');
const USER_TABLE = 'users';
const UserScheam = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createAt : {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
};
