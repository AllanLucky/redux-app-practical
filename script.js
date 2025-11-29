const redux = require('redux');
const createStore = redux.createStore;
const ORDER_PIZZA = "ORDER_PIZZA"

// Action
// const action = {
//   type: ORDER_PIZZA,
//   shop_name: "pizza shop"
// }


// Action Creator 
function orderPizza() {
  return {
    type: ORDER_PIZZA,
  }
}

// Reducer 

const initialState = {
  pizzaBase: 100,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_PIZZA:
      return {
        ...state,
        pizzaBase: state.pizzaBase - 1
      }
    default:
      return state;
  }
}


// Store need to hold the entire state of the application

const store = createStore(reducer);

// it expose a method called getState which gives your application access to the current state in the store 

console.log("Initial State", store.getState());
 
// Registers listeners via subscriber(listener)

const unsubscribe = store.subscribe(() => console.log('Updated State', store.getState()));

// Allow state to be updated via dispatch(Actions)
store.dispatch(orderPizza());
store.dispatch(orderPizza());
store.dispatch(orderPizza());
store.dispatch(orderPizza());
store.dispatch(orderPizza());
store.dispatch(orderPizza());
store.dispatch(orderPizza());
store.dispatch(orderPizza());

unsubscribe();
store.dispatch(orderPizza());



