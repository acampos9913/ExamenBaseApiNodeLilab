import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, product_cantidad) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/product/get/${id}`);

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product_id: data.product_id,
      product_name: data.product_name,
      product_imagen: data.product_imagen,
      product_precio: data.product_precio,
      product_stock: data.product_cantidad,
      product_cantidad,
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const addToPurchase = (cartItems) => async (dispatch, getState) => {
  const items = {pParametroJson : cartItems}
  await axios.post(`/api/purchase/add`, items);
  localStorage.setItem("cart", JSON.stringify([]));
};

export const removeFromCart = (product_id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: product_id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
