import { uuid } from '../helpers/uuid';

export const initialState = {
  list: [
    {
      id: uuid(),
      name: 'Income Tax',
      brackets: [{ threshold: 10000, rate: .035 }],
      increaseRate: 0.08,
      target: -1
    }
  ],
};

export function reducer(state = initialState, action) {
  switch(action.type) {
    case 'UPDATE_TAX':
      return {
        ...state,
        list: state.list.map((t) => {
          if (t.id === action.payload.id) {
            return { ...t, [action.payload.prop]: action.payload.value };
          }
          return t;
        })
      };

    case 'UPDATE_TAX_BRACKET':
      return {
        ...state,
        list: state.list.map((t) => {
          if (t.id === action.payload.id) {
            return {
              ...t,
              brackets: [...t.brackets].map((k, index) => {
                if (action.payload.index === index) {
                  return { ...k, [action.payload.prop]: action.payload.value };
                }
                return k;
              })
            }
          }
          return t;
        })
      };

    case 'ADD_TAX':
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: uuid(),
            name: `New One (${state.list.length})`,
            brackets: [{ threshold: 10000, rate: .035 }],
            increaseRate: 0.08,
            target: -1
          }
        ]
      };

    case 'ADD_TAX_BRACKET':
      return {
        ...state,
        list: state.list.map(t => {
          if (t.id === action.payload.id) {
            return { ...t, brackets: t.brackets.concat({ threshold: 0, rate: 0 }) };
          }
          return t;
        })
      };

    case 'DELETE_TAX':
      return {
        ...state,
        list: state.list.filter(t => t.id !== action.payload.id),
      };

    case 'DELETE_TAX_BRACKET':
      return {
        ...state,
        list: state.list.map(t => {
          if (action.payload.id === t.id) {
            const dIndex = action.payload.index == null ? t.brackets.length - 1 : action.payload.index;
            return { ...t, brackets: t.brackets.filter((k, index) => index !== dIndex) };
          }
          return t;
        })
      };
  }
  return state;
}
