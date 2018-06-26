import { uuid } from '../helpers/uuid';

const initialState = {
  list: [{ id: uuid(), name: 'Savings', additions: 0, interestRate: 0.08, balance: 0 }],
};

export function reducer(state = initialState, action) {
  switch(action.type) {
    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        list: state.list.map((t) => {
          if (t.id === action.payload.id) {
            return { ...t, [action.payload.prop]: parseFloat(action.payload.value) };
          }
          return t;
        })
      };
    case 'ADD_ACCOUNT':
      return {
        ...state,
        list: [
          ...state.list,
          { id: uuid(), name: `New One (${state.list.length})`, additions: 0, interestRate: 0, balance: 0 }
        ]
      };
  }
  return state;
}
