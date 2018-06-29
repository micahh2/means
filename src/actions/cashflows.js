
export function updateCashflow(payload) {
  return { type: 'UPDATE_CASHFLOW', payload };
}

export function addCashflow() {
  return { type: 'ADD_CASHFLOW' };
}

export function deleteCashflow(payload) {
  return { type: 'DELETE_CASHFLOW', payload };
}
