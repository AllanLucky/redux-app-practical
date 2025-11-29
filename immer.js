const redux = require('redux');
const createStore = redux.createStore;
const produce = require('immer').produce;
const FILL_UPDATE = 'FILL_UPDATE';

const initialState = {
  type: "veggies",
  ingredients: {
    bread: "Whole Grain",
    filling: "Lettuce and Tomato",
    sauces: "Mustard"
  }
};

const updateFill = (filling) => {
  return {
    type: FILL_UPDATE,
    payload: filling
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FILL_UPDATE:
      // return {
      //   ...state,
      //   ingredients: {
      //     ...state.ingredients,
      //     filling: action.payload
      //   }
      // }
      // This work the same as the above code 
      return produce(state, (draft) => {
        draft.ingredients.filling = action.payload
      });
    default:
      return state
  }
}

const store = createStore(reducer);
console.log("intial state", store.getState());

const unsubscribe = store.subscribe(() => {

  console.log("Update State", store.getState());
})
store.dispatch(updateFill("Grilled Veggies and Cheese"));
unsubscribe();