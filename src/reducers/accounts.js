
const initialState = {
  list: [{ name: 'Savings', additions: 0, interestRate: 0.08, balance: 0 }],
};

export function reducer(state = initialState, action) {
  switch(action.type) {
    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        list: [
          { ...state.list[0], [action.payload.prop]: parseFloat(action.payload.value) }
        ]
      };
  }
  return state;
}
