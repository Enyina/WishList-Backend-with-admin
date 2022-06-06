const router = require("express").Router();
const productController = require("../controllers/products");

router.route("/").get(productController.getAllproducts);

router.get("/:category", productController.product_category);

router.get("/:id", productController.getOneProduct);

module.exports = router;
