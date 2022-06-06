const router = require("express").Router();
const { body, validationResult } = require("express-validator");

const productController = require("../controllers/products");

router
  .route("/")
  .get(productController.getAllproducts)
  .post(productController.createProduct);

//product by id
router
  .route("/:id")
  .get(productController.getOneProduct)
  .patch(productController.updateProduct)
  .delete(productController.deletProduct);

module.exports = router;
