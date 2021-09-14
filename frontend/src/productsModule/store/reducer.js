import * as Actions from "./actions.js";

const initialState = {
  products: [],
  loading: false,
};

const authReducer = (state = initialState, { payload, ...action }) => {
  switch (action.type) {
    case Actions.GET_PRODUCTS: {
      return {
        ...state,
        loading: false,
        products: payload || [],
      };
    }
    case Actions.CREATE_PRODUCT: {
      return state;
    }
    case Actions.UPDATE_PRODUCT: {
      return state;
    }
    case Actions.DELETE_PRODUCT: {
      let products = [...state.products];
      const idx = products.findIndex((p) => p._id === payload);
      products.splice(idx, 1);
      return { ...state, products: products };
    }
    default: {
      return state;
    }
  }
};
export default authReducer;
