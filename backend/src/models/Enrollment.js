const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Course = require('./Course');

const Enrollment = sequelize.define('Enrollment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false,
    },
    course_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Course,
            key: 'id'
        },
        allowNull: false,
    }
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'course_id']
        }
    ]
});

User.belongsToMany(Course, { through: Enrollment, foreignKey: 'user_id' });
Course.belongsToMany(User, { through: Enrollment, foreignKey: 'course_id' });

module.exports = Enrollment;