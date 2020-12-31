import { ADD_TO_FAVORITES } from "../constants/favoritesConstants"

export const favoritesReducers = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return [action.payload, ...state]
    default:
      return state
  }
}
