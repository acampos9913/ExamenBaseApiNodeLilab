import "./CartScreen.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// Components
import CartItem from "../components/CartItem";
import { addToPurchase } from "../redux/actions/cartActions";

// Actions
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {}, []);

  const addPurchase = () => {
    dispatch(addToPurchase(cartItems));
    window.location.reload();
  };

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (product_id) => {
    dispatch(removeFromCart(product_id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.product_cantidad) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.product_precio * item.product_cantidad, 0)
      .toFixed(2);
  };

  return (
    <>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Carrito de Compras</h2>

          {cartItems.length === 0 ? (
            <div>
              Tu Carrito esta limpio <Link to="/">Atras</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.product_id}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )}
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>${getCartSubTotal()}</p>
          </div>
          <div>
            <button onClick={addPurchase}>Proceder a la compra</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
