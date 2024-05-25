const { configureStore } = require("@reduxjs/toolkit");
const { default: RootReducer } = require("./reducers/RootReducer");

const store = configureStore({
    reducer: RootReducer
})

export default store