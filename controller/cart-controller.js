import Product from "../model/productModel.js";
import Cart from "../model/cartModel.js";

export const getCart = async (req, res, next) => {
  const userId = req.params.id;
  let cart;
  try {
    cart = await Cart.findOne({ userId });
    if (cart && cart.items.length > 0) {
      return res.status(200).json({ cartDetail: cart });
    }
  } catch (err) {
    console.log(err);
  }
};

export const addCart = async (req, res, next) => {
  const userId = req.params.id;


  const productId = req.body.productId;
  const quantity= req.body.quantity

  next();

  try {
    let cart = await Cart.findOne({ userId });
    let item = await Product.findOne({ _id: productId });
    if (!item) {
      Cart.create({ bill: 0 }, (err, data) => {
        if (err) {
          console.log(data);
        }
      });
    }
    const name = item.productName;
    const price = item.price;
   

    if (cart) {
      let itemIndex = cart.items.findIndex((p) => p.productId == productId);
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({ productId, name, quantity, price });
      }
      cart.bill += quantity * price;
      cart = await cart.save();
      return res.status(200).json({ cartDetail: cart });
    } else {
      // no cart exists, create one
      const newCart = await Cart.create({
        userId,
        items: [{ productId, name, quantity, price }],
        bill: quantity * price,
      });
      return res.status(200).json({ cartDetail: newCart });
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteCart = async (req, res, next) => {
  const userId = req.params.userId;
  const productId = req.params.itemId;

  try {
    let cart = await Cart.findOne({ userId });
    let itemIndex =  cart.items.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      let productItem = cart.items[itemIndex];
      
      cart.bill -= productItem.quantity * productItem.price;

      cart.items.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.status(201).send(cart);
  } catch (err) {
    console.log(err);
  }
};
