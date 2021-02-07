import { Action } from "../actions";

export const initialState = {
  favs: []
};

export const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case Action.addFav:
      return {
        ...state,
        favs: [...state.favs, payload]
      };
    case Action.removeFav:
      return {
        ...state,
        favs: state.favs.filter((book) => book.asin !== payload.asin)
      };
    default:
      return state;
  }
};
