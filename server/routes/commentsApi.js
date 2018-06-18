const express = require('express')
const router = express.Router()

var Comments = require('../../DataAccess/commentModel');


/* GET api listing. */
router.get('/:id', (req, res) => { 
    Comments.find_all(req.params.id).then( (data)=>{
      res.send(data);
    } , (err)=>{
      console.error(err);
      res.send(err);
    })
});

router.post('/', (req, res) => {
  Comments.create(req.body.comment).then((data) => {
    Comments.find(data.id).then( (data)=>{
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
