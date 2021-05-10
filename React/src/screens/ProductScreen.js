import "./ProductScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

const ProductScreen = ({ match, history }) => {
  const [product_cantidad, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if(JSON.stringify(product) === '{}'){
      dispatch(getProductDetails(match.params.id));
    }
    else{
      if (product && match.params.id === product.product_id) {
        dispatch(getProductDetails(match.params.id));
      }
    }
      
  }, [dispatch, match, product]);

  const addToCartHandler = () => {
    dispatch(addToCart(product.product_id, product_cantidad));
    history.push(`/cart`);
  };

  return (
    <div className="productscreen">
      {loading ? (
        <h2>Cargando...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productscreen__left">
            <div className="left__image">
              <img src={product.product_imagen} alt={product.product_name} />
            </div>
            <div className="left__info">
              <p className="left__name">${product.product_name}</p>
              <p>Precio: ${product.product_precio}</p>
              <p>Descripcion: {product.product_descripcion}</p>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Precio:
                <span>${product.product_precio}</span>
              </p>
              <p>
                Estado:
                <span>
                  {product.product_stock > 0 ? "En Stock" : "Sin Stock"}
                </span>
              </p>
              <p>
                Qty
                <select value={product_cantidad} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(product.product_cantidad).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <button type="button" onClick={addToCartHandler}>
                  Agregar al carrito
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
