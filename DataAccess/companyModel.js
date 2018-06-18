var Sequelize = require('sequelize');
var {connection}  = require('./DataAccessConnection');
var {Customer}  = require('./customerModel');

class Company {

  constructor() {
    this.Company = connection.define('company', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name : Sequelize.TEXT,
      address : Sequelize.TEXT,
      country : Sequelize.TEXT,
    });
  }

}

const companyModel = new Company();
module.exports = companyModel;

