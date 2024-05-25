import queryReducer from "./QueryReducer";
import userReducer from "./UserReducer";

const { combineReducers } = require("@reduxjs/toolkit");

const RootReducer = combineReducers({
    user: userReducer,
    query: queryReducer,
})

export default RootReducer