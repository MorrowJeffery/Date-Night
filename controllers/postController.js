const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAllPosts: function(req, res) {
    db.Post
      .find(req.query)
      .sort({ date_created: -1 })
      .then(dbModel => res.json(dbModel))  
      .catch(err => res.status(422).json(err));
  },
//   findById: function(req, res) {
//     db.Book
//       .findById(req.params.id)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
  createPost: function(req, res) {
    db.Post
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
//   update: function(req, res) {
//     db.Book
//       .findOneAndUpdate({ _id: req.params.id }, req.body)
//       .then(dbModel => res.json(dbModel))
//       .catch(err => res.status(422).json(err));
//   },
  remove: function(req, res) {
    db.Post
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
