const express = require('express')
const router = express.Router()

var {Company} = require('../../DataAccess/companyModel');


/* GET api listing. */
router.get('/', (req, res) => { 
  Company.findAll({
    }).then( (data)=>{
      res.send(JSON.stringify(data));
    } , (err)=>{
      console.error(err);
      res.send(err);
    })
});



module.exports = router
