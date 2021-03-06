import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  FETCH_INGREDIENTS_FAILED,
  SET_INGREDIENTS,
} from "../actions/actionsTypes";

const initialState = {
  ingredients: null,
  error: false,
  totalPrice: 0,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        building: true,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        building: true,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    case SET_INGREDIENTS:
      return {
        ...state,
        totalPrice: 4,
        ingredients: action.ingredients,
        error: false,
        building: false,
      };
    case FETCH_INGREDIENTS_FAILED:
      return { ...state, error: true };
    default:
      return state;
  }
};

export default reducer;
