import * as actionTypes from "./actionsTypes";
import axios from "../../axios-orders";

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredietns = (ings) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ings,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return async (dispatch) => {
    try {
      const { data: ingredients } = await axios.get("/ingredients.json");
      dispatch(setIngredietns(ingredients));
    } catch (ex) {
      dispatch(fetchIngredientsFailed());
    }
  };
};
