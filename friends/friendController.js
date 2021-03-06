const router = require('express').Router();

const Friend = require('./friendModel');

router
  .route('/')
  .get((req, res) => {
    Friend.find({})
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json({err: 'The friends information could not be retrieved'});
      });
  })
  .post((req, res) => {
    const {firstName, lastName, age} = req.body
    if(!firstName || !lastName || !age){
        res.status(400).json({err: 'Please provide firstName, lastName and age for the friend'})
    }
    if(!Number.isInteger(age) || age < 1 || age>120){
        res.status(400).json({err: 'Age must be a number between 1 and 120'})
    }

    const friend = new Friend ({firstName, lastName, age});
    friend
      .save()
      .then(savedFriend => {
        res.status(201).json(savedFriend);
      })
      .catch(err => res.status(500).json({err:'There was an error while saving the friend to the database.'}));
  })
router
  .route('/:id')
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json({err: 'The friends information could not be retrieved'});
      });
  })
  .put((req, res) =>{
    const {firstName, lastName, age} = req.body;
    Friend
      .findByIdAndUpdate(req.params.id, req.body)
      .then(response => {
        if (response===null){
          res.status(404).json({ message: 'not found'});
        }
        else{
          res.status(200).json(response);
        }
      })
      .catch(err => {
        if (err.name==='CastError'){
          res.status(400).json({
            message: 'The ID provided is invalid. Please try again.',
          });
        }
        else {
          res
            .status(500)
            .json({ errorMessage: 'The Friend could not be removed', err});
        }
      })
  })
  .delete((req, res) =>{
    const {id} = req.params;
    Friend.findByIdAndRemove(id)
      .then(response => {
        if (response===null){
          res.status(404).json({message: 'not found'});
        }
        else{
          res.status(200).json(response);
        }
      })
      .catch(err => {
        res.status(500).json({err: 'The friends information could not be retrieved'});
      });
  });



module.exports = router;