import "./CartItem.css";
import { Link } from "react-router-dom";

const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
  return (
    <div className="cartitem">
      <div className="cartitem__image">
        <img src={item.product_imagen} alt={item.product_name} />
      </div>
      <Link to={`/product/${item.product}`} className="cartItem__name">
        <p>{item.product_name}</p>
      </Link>
      <p className="cartitem__price">${item.product_precio}</p>
      <select
        value={item.product_stock}
        onChange={(e) => qtyChangeHandler(item.product_id, e.target.value)}
        className="cartItem__select"
      >
        {[...Array(item.product_cantidad).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
      <button
        className="cartItem__deleteBtn"
        onClick={() => removeHandler(item.product_id)}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;
