var Sequelize = require('sequelize');
var {connection}  = require('./DataAccessConnection');

class Comments {
  constructor() {
    this.Comments = connection.define('comment', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      text	: Sequelize.TEXT,
      customerID : Sequelize.INTEGER,
      createDate	: Sequelize.DATE,
    });
  }

}

const commentsModel = new Comments();
module.exports = commentsModel;
