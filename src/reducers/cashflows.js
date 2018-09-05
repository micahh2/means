import { uuid } from '../helpers/uuid';

export function createCashflow({ title, length }) {
  return { id: uuid(), name: title || `New (${length})`, amount: 0, increaseRate: 0, recurrance: 1, changes: [] };
}

export function createCashflowChange({ title, changes }) {
  const period = changes && changes.map(t => t.period).reduce((a, b) => Math.max(a, b), 0) || 0;
  return { id: uuid(), name: title || `Change at (${period})`, period };
}

export const initialState = {
  list: [createCashflow({ title: 'Income' })],
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
          createCashflow({ length: state.list.length }),
        ]
      };

    case 'DELETE_CASHFLOW':
      return {
        ...state,
        list: state.list.filter(t => t.id !== action.payload.id),
      };

    case 'UPDATE_CASHFLOW_CHANGE':
      return {
        ...state,
        list: state.list.map((t) => {
          if (t.id === action.payload.id) {
            return {
              ...t,
              changes: t.changes.map(k => k.id === action.payload.changeId ? 
                { ...k, [action.payload.prop]: action.payload.value } : k
              )
            }
          }
          return t;
        })
      };

    case 'ADD_CASHFLOW_CHANGE':
      return {
        ...state,
        list: state.list.map((t) => {
          if (t.id === action.payload.id) {
            return { ...t, changes: [ ...t.changes, createCashflowChange({ length: state.list.length }) ] };
          }
          return t;
        })
      };

    case 'DELETE_CASHFLOW_CHANGE':
      return {
        ...state,
        list: state.list.map((t) => {
          if (t.id === action.payload.id) {
            return { ...t, changes: t.changes.filter(k => k.id !== action.payload.changeId) };
          }
          return t;
        })
      };

    case 'SET_MORE_CASHFLOW_ID':
      return { ...state, moreCashflowId: action.payload.id };

    case 'CLEAR_MORE_CASHFLOW_ID':
      return { ...state, moreCashflowId: undefined };
  }
  return state;
}
