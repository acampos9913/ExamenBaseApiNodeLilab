import "./Product.css";
import { Link } from "react-router-dom";

const Product = ({ product_imagen, product_descripcion, product_precio, product_name, product_id }) => {
  return (
    <div className="product">
      <img src={product_imagen} alt={product_name} />

      <div className="product__info">
        <p className="info__name">{product_name}</p>

        <p className="info__description">{product_descripcion.substring(0, 100)}...</p>

        <p className="info__price">${product_precio}</p>

        <Link to={`/product/${product_id}`} className="info__button">
          Ver
        </Link>
      </div>
    </div>
  );
};

export default Product;
