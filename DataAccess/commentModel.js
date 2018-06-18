var Sequelize = require('sequelize');
var connect  = require('./DataAccessConnection');

class Comments {
  constructor() {
    this.model = connect.connection.define('comment', {
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

  find_all(id){
    return this.model.findAll({
      where : {customerID : id},
    });
  }
  
  creare(comment){
    return this.model.create(comment);
  }

  find(id){
    return this.model.find({
      where : {id: id}
    })
  }

}

const commentsModel = new Comments();
module.exports = commentsModel;
