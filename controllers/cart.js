const Product = require("../models/product");

exports.addToCart = async (req, res) => {
  let id = req.params.id;

  const product = await Product.findById(id);

  if (typeof req.session.cart == "undefined") {
    req.session.cart = [];
    req.session.cart.push({
      title: product.title,
      qty: 1,
      price: parseFloat(product.price).toFixed(2),
      image: product.image,
    });
  } else {
    let cart = req.session.cart;
    let newItem = true;
    for (let i = 0; i < cart.length; i++) {
      const addedProd = cart[i];
      if (addedProd.id == id) {
        addedProd.qty++;
        newItem = false;
        break;
      }
    }
    if (newItem) {
      cart.push({
        title: product.title,
        qty: 1,
        price: parseFloat(product.price).toFixed(2),
        image: product.image,
      });
    }
  }
  console.log(req.session.cart);
};

exports.updateCArtProduct = (req, res) => {
  const id = req.params.id;
  const cart = req.session.cart;
  const action = req.query.action;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == id) {
      switch (action) {
        case "add":
          cart[i].qty++;
          break;
        case "remove":
          cart[i].qty--;
          if (cart[i.qty < 1]) {
            cart.splice(i, 1);
          }
          break;
        case "clear":
          cart.splice(i, 1);
          if (cart.length == 0) {
            delete req.session.cart;
          }
          break;

        default:
          break;
      }
    }
  }
};

exports.clear_cart = (req, res) => {
  delete req.session.cart;
  console.log("cart Cleared");
  res.status(200).json({
    status: "success",
    message: "cart cleared",
  });
};
