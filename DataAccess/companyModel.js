var Sequelize = require('sequelize');
var connect  = require('./DataAccessConnection');
var Customer  = require('./customerModel');

class Company {

  constructor() {
    this.model = connect.connection.define('company', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name : Sequelize.TEXT,
      address : Sequelize.TEXT,
      country : Sequelize.TEXT,
    });
  }

  find_all(){
    return this.model.findAll({
    });
  }

}

const companyModel = new Company();
module.exports = companyModel;

