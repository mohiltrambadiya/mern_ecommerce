import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAIL,
  MY_ORDER_REQUEST,
  MY_ORDER_SUCCESS,
  MY_ORDER_FAIL,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  CLEAR_ERRORS,
} from "../constants/orderConstants";

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_FAIL:
      return {
        loading: true,
        error: action.payload,
      };
    case CLEAR_ERRORS: {
      return {
        ...state,
        loading: false,
        error: null,
      };
    }

    default:
      return state;
  }
};

export const myOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case MY_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case MY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS: {
      return {
        ...state,
        error: null,
      };
    }

    default:
      return state;
  }
};

export const orderDetailReducer = (state = {order: {}}, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return {
        loading: true,
      }  
    case ORDER_DETAIL_SUCCESS:
      return {
        loading: false,
        order: action.payload
      }
      case ORDER_DETAIL_FAIL:
        return {
          loading: false,
          error: action.payload
        }
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null
          }
    default:
      return state
  }
}