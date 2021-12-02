import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailReducer, productReducer } from './reducers/productReducer'
import { profielReducer, userReducer, forgotPasswordReducer } from './reducers/userReducer'

const reducer = combineReducers({
    products: productReducer,
    productDetail: productDetailReducer,
    user: userReducer,
    profile: profielReducer,
    forgotPassword: forgotPasswordReducer
})
let initialState = {}
const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store