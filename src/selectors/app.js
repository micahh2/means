import { FV } from 'formulajs';

export const createSelector =
  (...funcs) => 
  (state) => funcs.length > 1 ?
    funcs[funcs.length - 1](...funcs.slice(0, -1).reduce((a, b) => a.concat([b(state)]), [])) :
    funcs[0](state);

export const getAccounts = (state) => state.accounts.list;

export const getProjection = createSelector(getAccounts, (accounts) => {
  const proj = [];
  let currentTotal = 0;
  for (let i = 0; i < 70; i++) {
    let yearTotal = 0;
    for (const acc of accounts) {
      yearTotal += FV(acc.interestRate, i, -acc.additions, -acc.balance);
    }
    proj.push(yearTotal);
  }

  return proj;
});
