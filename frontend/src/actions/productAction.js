import axios from 'axios'
import {ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS} from '../constants/productConstants'

//get all products
export const getAllProduct = ()=> async (dispach) => {
    try {
        dispach({
            type: ALL_PRODUCT_REQUEST
        })
        const {data} = await axios.get("/api/v1/products")
        dispach({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispach({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

//clearing errors
export const clearErrors = ()=> async (dispach) => {
    dispach({
        type: CLEAR_ERRORS
    })
}