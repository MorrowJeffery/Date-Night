const router = require("express").Router();
const controller = require('../controllers/postController');

router.route("/api/posts")
.get(controller.findAllPosts)
.post(controller.createPost)

router.route("api/posts/:id")
//.get(controller.findById)
//.put(controller.update)
.delete(controller.deletePost)



module.exports = router;
