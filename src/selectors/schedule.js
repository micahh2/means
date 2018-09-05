
export function getEvents(state) {
  const targetGroups = {
    accounts: state.accounts.list,
    cashflow: state.cashflows.list,
    tax: state.taxes.list,
  };
  return state.schedule.events.map(t => ({
    ...t,
    collection: t.targetType && targetGroups[t.targetType] || []
  }));
}
