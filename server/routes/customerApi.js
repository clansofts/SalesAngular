const express = require('express')
const router = express.Router()

var Customer = require('../../DataAccess/customerModel');
var Company = require('../../DataAccess/companyModel');
var Comments = require('../../DataAccess/commentModel');
const Sequelize = require('sequelize');


/* GET api listing. */
router.get('/', (req, res) => { 
    Customer.find_all().then( (data)=>{
      res.send(JSON.stringify(data));
    } , (err)=>{
      console.error(err);
      res.send(err);
    })
});

/* GET api listing. */
router.delete('/:id', (req, res) => { 

    Customer.destroy(req.params.id).then( (data)=>{
  
      Customer.find_all().then( (data)=>{
        res.send(JSON.stringify(data));
      } , (err)=>{
        console.error(err);
        res.send(err);
      });
  
    } , (err)=>{
      console.error(err);
      res.send(err);
    });

});


router.post('/', (req, res) => {
  var customer = req.body.item;

  Customer.create(customer).then((data) => {
    Customer.find(data.id).then((data)=>{
      res.send(JSON.stringify(data));
    } , (err)=>{
      console.error(err);
      res.send(err);
    })
  }, (err) => {
    console.error(err);
    res.send(err);
  })

});


router.put('/', (req, res) => {
  var customer = req.body.item;

  Customer.update(customer).then((data) => {
    Customer.find_all().then( (data)=>{
      res.send(JSON.stringify(data));
    } , (err)=>{
      console.error(err);
      res.send(err);
    });
  }, (err) => {
      console.error(err);
      res.send(err);
  });

});


router.get('/search', (req, res) => { 
  Customer.search(req.query).then( (data)=>{
    res.send(JSON.stringify(data));
  });
});

module.exports = router
