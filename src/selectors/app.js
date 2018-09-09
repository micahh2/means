import { FV } from 'formulajs';

export const createSelector =
  (...funcs) => 
  (state) => funcs.length > 1 ?
    funcs[funcs.length - 1](...funcs.slice(0, -1).reduce((a, b) => a.concat([b(state)]), [])) :
    funcs[0](state);

export const areNumbers = (...val) => val.every(t => !isNaN(+t + parseFloat(t)));

export const getAccounts = (state) => state.accounts.list.filter(t => areNumbers(t.balance));
export const getCashflows = (state) => state.cashflows.list.filter(t => areNumbers(t.amount, t.increaseRate, t.recurrance));

export const isEmpty = (val) => val == null || val === '';

export const deleteInvalidProps = (input) => {
  const out = { ...input };
  const keys = Object.keys(out);
  for (const i of keys) {
    if (!isEmpty(out[i])) { continue; }
    delete out[i];
  }
  return out;
}

export const getAdditions = (cashflows, id, i = 0) => cashflows
  .filter(t => (t.target === id || t.source === id) && t.target !== t.source)
  .filter(t => (isEmpty(t.start) || parseInt(t.start) <= i) && (isEmpty(t.end) || parseInt(t.end) >= i))
  .reduce((a, b) => a + Math.pow(1+(+b.increaseRate), i) * (+b.amount) * (+b.recurrance) * (b.target === id ? 1 : -1), 0);

export const getProjection = createSelector(getAccounts, getCashflows, (accounts, cashflows) => {
  const proj = [];

  const accTotals = accounts.reduce((a, b) => ({ ...a, [b.id]: +b.balance }), {});
  let currentCashflows = cashflows;
  proj.push(Object.values(accTotals).reduce((a,b) => a + b, 0));
  for (let i = 1; i < 70; i++) {
    currentCashflows = currentCashflows.map(t => 
      t.changes.filter(k => +k.period === i).reduce((a,b) => ({ ...a, ...deleteInvalidProps(b) }), t)
    );
    for (const acc of accounts) {
      const contributions = getAdditions(currentCashflows, acc.id, i);
      const months = 12;
      accTotals[acc.id] = FV(acc.interestRate/months, months, -contributions/months, -accTotals[acc.id]);
    }
    proj.push(Object.values(accTotals).reduce((a,b) => a + b, 0));
  }

  return proj;
});


