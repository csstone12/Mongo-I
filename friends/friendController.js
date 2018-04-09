const router = require('express').Router();

const friend = require('./friendModel');

router
  .route('/')
  .get((req, res) => {
    friend.find({})
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json({err: 'The friends information could not be retrieved'});
      });
  })
  .post((req, res) => {
    const { firstName, lastName, age} = req.body
    console.log(friend)
    if(!friend.firstName || !friend.lastName || !friend.age){
        res.status(400).json({err: 'Please provide firstName, lastName and age for the friend'})
    }
    if(!Number.isInteger(friend.age) || friend.age < 1 || friend.age>120){
        res.status(400).json({err: 'Age must be a number between 1 and 120'})
    }

    const friend = new friend ({ firstName, lastName, age});
    friend
      .save()
      .then(savedFriend => {
        res.status(201).json(savedFriend);
      })
      .catch(err => res.status(500).json({err:'There was an error while saving the friend to the database.'}));
  });


module.exports = router;