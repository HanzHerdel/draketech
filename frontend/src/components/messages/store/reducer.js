import * as Actions from "./actions.js";

const initialState = {
  message: "",
  show: false,
};

const messageReducer = (state = initialState, { payload, ...action }) => {
  switch (action.type) {
    case Actions.SHOW_MESSAGE: {
      return {
        ...state,
        show: true,
        message: payload,
      };
    }
    case Actions.RESET_MESSAGE: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
};
export default messageReducer;
