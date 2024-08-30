// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'sqlite', // Or your chosen database
    dialectOptions: { 
        ssl: {
            require: true, 
            rejectUnauthorized: false // Only for development, use a secure setup in production
        }
    } 
});

module.exports = sequelize;