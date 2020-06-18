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
  findByUser: async function(req,res) {
    const { id } = req.params;
    const user = await (db.User.findById(id)).populate({path: "posts", model: "Post"});
    res.json(user.posts);
  },
  findById: function(req, res) {
    db.Post
      // .findById(req.params.id)
      .find({_id: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
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
  deletePost: function(req, res) {
    db.Post
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
