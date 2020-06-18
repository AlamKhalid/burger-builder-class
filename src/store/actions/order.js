import * as actionsTypes from "./actionsTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionsTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionsTypes.PURCHASE_BURGER_FAIL,
    error,
  };
};

export const purchaseBurgerStart = () => {
  return {
    type: actionsTypes.PURCHASE_BURGER_SUCCESS,
  };
};

export const purchaseBurger = (orderData) => {
  return async (dispatch) => {
    try {
      dispatch(purchaseBurgerStart());
      const { data: id } = await axios.post("/orders.json", orderData);
      dispatch(purchaseBurgerSuccess(id.name, orderData));
    } catch (ex) {
      dispatch(purchaseBurgerFail(ex));
    }
  };
};

export const purchaseInit = () => {
  return {
    type: actionsTypes.PURCHASE_INIT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionsTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionsTypes.FETCH_ORDERS_FAIL,
    error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionsTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchOrdersStart());
      const res = await axios.get("/order.json");
      const fetchedOrders = [];
      for (let key in res.data) {
        fetchedOrders.push({ ...res.data[key], id: key });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    } catch (ex) {
      dispatch(fetchOrdersFail(ex));
    }
  };
};
