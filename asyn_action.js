const redux = require("redux");
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunk = require("redux-thunk").thunk;
const axios = require("axios");
const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_SUCCESSS = "FETCH_SUCCESSS";
const FETCH_ERROR = "FETCH_ERROR";

// STATE
const initialState = {
  loading: false,
  products: [],
  error: false
}

// ACTIONS
function fetchRequest() {
  return {
    type: FETCH_REQUEST
  }
}
function fetchSuccess(products) {
  return {
    type: FETCH_SUCCESSS,
    payload: products
  }
}
function fetchError() {
  return {
    type: FETCH_ERROR
  }
}

// REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_SUCCESSS:
      return {
        ...state,
        loading: false,
        products: action.payload
      }
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return state;
  }
}

// THUNK ACTION CREATOR
const fetchProducts = () => {
  return function (dispatch) {
    dispatch(fetchRequest)

    axios.get("https://fakestoreapi.com/products")
      .then(res => {
        // response.data
        const products = res.data.map((product) => product.title);
        // console.log(products)
        dispatch(fetchSuccess(products))


      }).catch(error => {
        dispatch(fetchError())
      });
  }
}

// CREATING STORE 
const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchProducts())