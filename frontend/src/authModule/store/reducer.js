import * as Actions from "./actions.js";

const initialState = {
  logged: false,
  token: "",
};

const authReducer = (state = initialState, { payload, ...action }) => {
  switch (action.type) {
    case Actions.LOGGING: {
      return {
        ...state,
        logged: true,
        token: payload,
      };
    }
    case Actions.DELETE_TOKEN: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};
export default authReducer;
