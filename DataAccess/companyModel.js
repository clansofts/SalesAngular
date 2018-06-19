var Sequelize = require('sequelize');
var connect  = require('./DataAccessConnection');

class Company {

  constructor() {
    this.model = connect.connection.define('company', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name : Sequelize.TEXT,
      address : Sequelize.TEXT,
      country : Sequelize.TEXT,
      sizeCompany : Sequelize.TEXT,
      establishedYear : Sequelize.TEXT,
      ceo : Sequelize.TEXT,
      isActive : Sequelize.INTEGER,
    });
  }

  find_all(){
    return this.model.findAll({
      where : {isActive : 1}
    });
  }

  search(query){
    return this.model.findAll({
      where : {[query.filterBy] : { [Sequelize.Op.like]: '%' + query.value + '%'} , isActive : 1}
    })
  }

  create(company){
    return this.model.create(company);
  }

  find(id){
    return this.model.find({
      where : {id: id}
    })
  }

  destroy(id){
    return this.model.update(
      { isActive: 0 }, { where: {id: id }
    });
  }

  update(company){
    console.log(company);
    
    return this.model.update({ 
      name: company.name, 
      address: company.address, 
      country: company.country, 
      sizeCompany: company.sizeCompany, 
      establishedYear: company.establishedYear, 
      ceo: company.ceo
    },
    {
      where: {
        id: company.id
      }
    });
  }

}

const companyModel = new Company();
module.exports = companyModel;

