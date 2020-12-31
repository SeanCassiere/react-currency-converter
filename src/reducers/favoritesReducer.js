import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from "../constants/favoritesConstants"

export const favoritesReducers = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return [action.payload, ...state]
    case REMOVE_FROM_FAVORITES:
      return state.filter((item) => item !== action.payload)
    default:
      return state
  }
}
