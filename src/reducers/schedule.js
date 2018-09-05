import { uuid } from '../helpers/uuid';

export function createEvent({ name, length }) {
  return { id: uuid(), name: name || `New (${length})`, modType: undefined, targetType: undefined,  target: undefined };
}

const initialState = {
  events: [createEvent({ name: 'Sell Car' })],
};

export function reducer(state = initialState, action) {
  switch(action.type) {
    case 'UPDATE_EVENT':
      return {
        ...state,
        events: state.events.map((t) => {
          if (t.id === action.payload.id) {
            return { ...t, [action.payload.prop]: action.payload.value };
          }
          return t;
        })
      };

    case 'ADD_EVENT':
      return {
        ...state,
        events: [
          ...state.events,
          { id: uuid(), name: `New One (${state.events.length})`, interestRate: 0, balance: 0 }
        ]
      };

    case 'DELETE_EVENT':
      return {
        ...state,
        events: state.events.filter(t => t.id !== action.payload.id),
      };
  }
  return state;
}
