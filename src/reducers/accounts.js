import { uuid } from '../helpers/uuid';

export function createAccount({ name, length }) {
  return { id: uuid(), name: name || `New Account (${length || 1})`, interestRate: 0, balance: 0 };
}

const initialState = {
  list: [{ ...createAccount({ name: 'Savings' }), interestRate: 0.08 }],
};

export function reducer(state = initialState, action) {
  switch(action.type) {
    case 'UPDATE_ACCOUNT':
      return {
        ...state,
        list: state.list.map((t) => {
          if (t.id === action.payload.id) {
            return { ...t, [action.payload.prop]: action.payload.value };
          }
          return t;
        })
      };

    case 'ADD_ACCOUNT':
      return {
        ...state,
        list: [
          ...state.list,
          { id: uuid(), name: `New One (${state.list.length})`, interestRate: 0, balance: 0 }
        ]
      };

    case 'DELETE_ACCOUNT':
      return {
        ...state,
        list: state.list.filter(t => t.id !== action.payload.id),
      };
  }
  return state;
}
