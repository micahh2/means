
export function getMoreCashflow(state) {
  const id = state.cashflows.moreCashflowId;
  return state.cashflows.list.find(t => t.id === id);
}


