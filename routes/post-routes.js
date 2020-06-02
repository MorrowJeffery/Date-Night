const router = require("express").Router();
const controller = require('../../controllers/booksController');

router.route("/api/books")
.get(controller.findAll)
.post(controller.create)

router.route("api/books/:id")
.get(controller.findById)
.put(controller.update)
.delete(controller.remove)



module.exports = router;
