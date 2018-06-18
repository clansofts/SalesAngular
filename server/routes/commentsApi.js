const express = require('express')
const router = express.Router()

var {Customer} = require('../../DataAccess/customerModel');
var {Comments} = require('../../DataAccess/commentModel');


/* GET api listing. */
router.get('/:id', (req, res) => { 
    Comments.findAll({
      where : {customerID : req.params.id},
    }).then( (data)=>{
      res.send(data);
    } , (err)=>{
      console.error(err);
      res.send(err);
    })
});

router.post('/', (req, res) => {  
  var comment = req.body.comment;

  Comments.create(comment).then((data) => {
    Comments.find({
      where : {id: data.id}
    }).then( (data)=>{
      res.send(data);
    } , (err)=>{
      console.error(err);
      res.send(err);
    })
  }, (err) => {
    console.error(err);
    res.send(err);
  })

});

module.exports = router
