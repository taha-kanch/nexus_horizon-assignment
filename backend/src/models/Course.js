const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Course = sequelize.define('Course', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    level: {
        type: DataTypes.ENUM('BEGINNER', 'INTERMADIATE', 'ADVANCED'),
        defaultValue: 'BEGINNER'
    },
});

module.exports = Course;