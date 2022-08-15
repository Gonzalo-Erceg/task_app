import { configureStore } from "@reduxjs/toolkit";

import listReducer from "./freacture/list/listSlice";

export default configureStore({
    reducer:listReducer
})