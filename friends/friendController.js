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
    const { firstName, lastName, age} = req.body
    if(!firstName || !lastName || !age){
        res.status(400).json({err: 'Please provide firstName, lastName and age for the friend'})
    }
    if(!Number.isInteger(age) || age < 1 || age>120){
        res.status(400).json({err: 'Age must be a number between 1 and 120'})
    }

    const friend = new Friend ({ firstName, lastName, age});
    friend
      .save()
      .then(savedFriend => {
        res.status(201).json(savedFriend);
      })
      .catch(err => res.status(500).json({err:'There was an error while saving the friend to the database.'}));
  });


module.exports = router;