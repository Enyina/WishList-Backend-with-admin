const router = require("express").Router();
const categoryController = require("../controllers/category");

router
  .route("/")
  .get(categoryController.getAllCategory)
  .post(categoryController.add_category);

router
  .route("/:id")
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
