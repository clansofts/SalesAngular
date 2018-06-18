var Sequelize = require('sequelize');
var {connection}  = require('./DataAccessConnection');
var {Company}  = require('./companyModel');
var {Comments}  = require('./commentModel');

class Customer {

  constructor() {
    this.Customer = connection.define('customer', {
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

    this.Customer.belongsTo(Company, { foreignKey: 'companyID' });
    Company.hasMany(this.Customer, { foreignKey: 'id' });

    Comments.belongsTo(this.Customer, { foreignKey: 'customerID', });
    this.Customer.hasMany(Comments, { foreignKey: 'id' ,onDelete: 'CASCADE', hooks: true});

  }
  
  find_all(){
    return this.Customer.findAll({
      include : [{ model: Company, attributes: ['name']}]
    });
  }
  
  destroy(id){
    return this.Customer.destroy({
      where : {id: id}
    });
  }

  find(id){
    return this.Customer.find({
      where : {id: id},
      include : [{ model: Company, attributes: ['name']}]
    })
  }

  create(customer){
    return this.Customer.create(customer);
  }

  update(customer){
    return this.Customer.update({ 
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
    return this.Customer.findAll({
      where : {[query.filterBy] : { [Sequelize.Op.like]: '%' + query.value + '%'}},
      include : [{ model: Company, attributes: ['name']}]
    })
  }
}

const customerModel = new Customer();
module.exports = customerModel;
