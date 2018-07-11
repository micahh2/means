import { uuid } from '../helpers/uuid';

const initialState = {
  list: [{ id: uuid(), name: 'Income', amount: 0, increaseRate: 0.08, schedule: 0, target: -1 }],
};

export function reducer(state = initialState, action) {
  switch(action.type) {
    case 'UPDATE_CASHFLOW':
      return {
        ...state,
        list: state.list.map((t) => {
          if (t.id === action.payload.id) {
            return { ...t, [action.payload.prop]: action.payload.value };
          }
          return t;
        })
      };
    case 'ADD_CASHFLOW':
      return {
        ...state,
        list: [
          ...state.list,
          { id: uuid(), name: `New One (${state.list.length})`, additions: 0, interestRate: 0, balance: 0 }
        ]
      };
    case 'DELETE_CASHFLOW':
      return {
        ...state,
        list: state.list.filter(t => t.id !== action.payload.id),
      };
  }
  return state;
}
