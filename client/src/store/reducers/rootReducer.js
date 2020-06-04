import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userMail: "",
  errorMessage: "",
  userHistory: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.setUserMail:
      return {
        ...state,
        userMail: action.payload.userMail,
      };
    case actionTypes.setErrorMessage:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    case actionTypes.setUserHistory:
      return {
        ...state,
        historyData: [
          ...action.payload.historyData.sort((a, b) => (a._id > b._id ? 1 : -1)),
        ],
      };
    default:
      return state;
  }
};

export default rootReducer;
