const router = require("express").Router();
const cart_Controller = require("../controllers/cart");

router.get("/add-product", cart_Controller.addToCart);

module.exports = router;
