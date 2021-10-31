import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import photosReducer from "./reducers/photosReducer";

const rootReducer = combineReducers({
    photos: photosReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type RootState = ReturnType<typeof rootReducer>