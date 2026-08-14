const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name is required' },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'A valid email is required' },
        notEmpty: { msg: 'Email is required' },
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Phone is required' },
      },
    },
    company: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Stored as JSONB: { street, city, zipcode, geo: { lat, lng } }
    address: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {},
      validate: {
        isValidAddress(value) {
          if (!value || typeof value !== 'object') {
            throw new Error('Address must be an object');
          }
          if (!value.city || !value.zipcode) {
            throw new Error('Address must include city and zipcode');
          }
        },
      },
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  }
);

module.exports = User;
