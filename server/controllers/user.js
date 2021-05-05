const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");

exports.userCart = async (req, res) => {
  //   console.log("Backend checking req.body - ", req.body);
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  //   Check if cart with logged in user id already exists
  let cartExistByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log("removed old cart");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    //   Get price for getting total
    let { price } = await Product.findById(cart[i]._id).select("price").exec();
    object.price = price;

    products.push(object);
  }
  console.log("products on backend", products);

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }
  console.log("cart total", cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,
  }).save();
  console.log('New Cart', newCart)
  res.json({ ok: true })
};

exports.getUserCart = async () => {
    const user = await User.findOne({ email: req.email.user}).exec();

    let cart = await Cart.findOne({ orderedBy: user._id}).populate('products.product', '_id title price totalAfterDiscount').exec();

    const { products, cartTotal, totalAfterDiscount} = cart

    res.json({ products, cartTotal, totalAfterDiscount})
}