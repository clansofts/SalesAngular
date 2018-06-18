var Sequelize = require('sequelize');
var connect  = require('./DataAccessConnection');
var Company  = require('./companyModel');
var Comments  = require('./commentModel');

class Customer {

  constructor() {
    this.model = connect.connection.define('customer', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: Sequelize.TEXT,
      lastName: Sequelize.TEXT,
      companyID: Sequelize.INTEGER,
      email: Sequelize.TEXT,
      phone: Sequelize.TEXT
    });

    this.model.belongsTo(Company.model, { foreignKey: 'companyID' });
    Company.model.hasMany(this.model, { foreignKey: 'id' });

    Comments.model.belongsTo(this.model, { foreignKey: 'customerID', });
    this.model.hasMany(Comments.model, { foreignKey: 'id' ,onDelete: 'CASCADE', hooks: true});

  }
  
  find_all(){
    return this.model.findAll({
      include : [{ model: Company.model, attributes: ['name']}]
    });
  }
  
  destroy(id){
    return this.model.destroy({
      where : {id: id}
    });
  }

  find(id){
    return this.model.find({
      where : {id: id},
      include : [{ model: Company.model, attributes: ['name']}]
    })
  }

  create(customer){
    return this.model.create(customer);
  }

  update(customer){
    return this.model.update({ 
      firstName: customer.firstName, 
      lastName: customer.lastName, 
      phone: customer.phone, 
      email: customer.email, 
      companyID: customer.companyID
    },
    {
      where: {
        id: customer.id
      }
    });
  }

  search(query){
    return this.model.findAll({
      where : {[query.filterBy] : { [Sequelize.Op.like]: '%' + query.value + '%'}},
      include : [{ model: Company.model, attributes: ['name']}]
    })
  }
}

const customerModel = new Customer();
module.exports = customerModel;
