var Sequelize = require('sequelize');

// database credentials
const DBHOST = 'localhost';
const DBUSER = 'root';
const DBPASS = '';
const DBNAME = 'angusales';

class DataAccess {

    constructor() {
      this.connection = new Sequelize( DBNAME , DBUSER , DBPASS , {
        host: DBHOST ,
        dialect: 'mysql',
        operatorsAliases: false, // prevent string deprication
        pool: { // You can read about the pool in the documentation
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: { // Sequelize define timestamp columns by default. To prevent it we will defind the following line
            timestamps: false,
            freezeTableName: true
        }
      });
    }
  
  }
  
  //create a connection to the DB
  const da = new DataAccess();
  module.exports = da;
  