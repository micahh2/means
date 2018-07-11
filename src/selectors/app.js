import { FV } from 'formulajs';

export const createSelector =
  (...funcs) => 
  (state) => funcs.length > 1 ?
    funcs[funcs.length - 1](...funcs.slice(0, -1).reduce((a, b) => a.concat([b(state)]), [])) :
    funcs[0](state);

export const getAccounts = (state) => state.accounts.list;
export const getCashflows = (state) => state.cashflows.list;

export const getAdditions = (cashflows, id, i = 0) => cashflows
  .filter(t => t.target == id && typeof (t.amount + t.increaseRate) === 'number')
  .reduce((a, b) => a + Math.pow(1+b.increaseRate, i) * b.amount, 0);

export const getProjection = createSelector(getAccounts, getCashflows, (accounts, cashflows) => {
  const proj = [];

  const accTotals = accounts.reduce((a, b) => ({ ...a, [b.id]: b.balance }), {});
  proj.push(Object.values(accTotals).reduce((a,b) => a + b, 0));
  for (let i = 1; i < 70; i++) {
    for (const acc of accounts) {
      const contributions = getAdditions(cashflows, acc.id, i);
      const months = 12;
      accTotals[acc.id] = FV(acc.interestRate/months, months, -contributions/months, -accTotals[acc.id]);
    }
    proj.push(Object.values(accTotals).reduce((a,b) => a + b, 0));
  }

  return proj;
});
