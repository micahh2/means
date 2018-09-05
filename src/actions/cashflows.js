
export function updateCashflow(payload) {
  return { type: 'UPDATE_CASHFLOW', payload };
}

export function addCashflow() {
  return { type: 'ADD_CASHFLOW' };
}

export function deleteCashflow(payload) {
  return { type: 'DELETE_CASHFLOW', payload };
}

export function updateCashflowChange(payload) {
  return { type: 'UPDATE_CASHFLOW_CHANGE', payload };
}

export function addCashflowChange({ id }) {
  return { type: 'ADD_CASHFLOW_CHANGE', payload: { id } };
}

export function deleteCashflowChange({ id, changeId }) {
  return { type: 'DELETE_CASHFLOW_CHANGE', payload: { id, changeId } };
}

export function setMoreCashflowId({ id }) {
  return { type: 'SET_MORE_CASHFLOW_ID', payload: { id } };
}

export function clearMoreCashflowId() {
  return { type: 'CLEAR_MORE_CASHFLOW_ID' };
}

