import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  LIST_ALL_FAVORITES,
} from "../constants/favoritesConstants"

export const favoritesReducers = (state = [], action) => {
  switch (action.type) {
    case LIST_ALL_FAVORITES:
      const localData = localStorage.getItem("SC_CURR_FAVS")
      if (localData) {
        return JSON.parse(localData)
      } else {
        return state
      }
    case ADD_TO_FAVORITES:
      const addData = [action.payload, ...state]
      localStorage.setItem("SC_CURR_FAVS", JSON.stringify(addData))
      return addData
    case REMOVE_FROM_FAVORITES:
      const remData = state.filter((item) => item !== action.payload)
      localStorage.setItem("SC_CURR_FAVS", JSON.stringify(remData))
      return remData
    default:
      return state
  }
}
