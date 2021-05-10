import "./HomeScreen.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import Product from "../components/Product";

//Actions
import { getProducts as listProducts } from "../redux/actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const getProducts = useSelector((state) => state.getProducts);
  const { products, loading, error } = getProducts;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="homescreen">
      <h2 className="homescreen__title">Ultimos Productos</h2>
      <div className="homescreen__products">
        {loading ? (
          <h2>Cargando...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          products.map((product) => (
            <Product
              key={product.product_id}
              product_name={product.product_name}
              product_descripcion={product.product_descripcion}
              product_precio={product.product_precio}
              product_imagen={product.product_imagen}
              product_id={product.product_id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
