const express = require('express')
const router = express.Router()

var Company = require('../../DataAccess/companyModel');


/* GET api listing. */
router.get('/', (req, res) => { 
  Company.find_all().then( (data)=>{
      res.send(JSON.stringify(data));
    } , (err)=>{
      console.error(err);
      res.send(err);
    })
});

router.get('/search', (req, res) => { 
  Company.search(req.query).then( (data)=>{
    res.send(JSON.stringify(data));
  });
});

router.post('/', (req, res) => {
  var company = req.body.company;

  Company.create(company).then((data) => {
    Company.find(data.id).then((data)=>{
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

router.delete('/:id', (req, res) => { 

  Company.destroy(req.params.id).then( (data)=>{

    Company.find_all().then( (data)=>{
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

router.put('/', (req, res) => {
  var company = req.body.company;

  Company.update(company).then((data) => {
    Company.find_all().then( (data)=>{
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


module.exports = router
