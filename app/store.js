import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./cartreducer";
import productreducer from "./productreducer";

export default configureStore({
    reducer:{
        cart:CartReducer,
        product:productreducer
    }
})