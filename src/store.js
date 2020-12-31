import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import { favoritesReducers } from "./reducers/favoritesReducer"

const reducer = combineReducers({
  favoritesList: favoritesReducers,
})

const initialState = {
  favoritesList: [],
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
