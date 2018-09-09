import { uuid } from '../helpers/uuid';
import { getProjection, getAdditions } from './app';
import { createCashflow } from '../reducers/cashflows';
import { createAccount } from '../reducers/accounts';

describe('getAdditions', () => {

  test('read amount', () => {
    const cashflows = [
      { ...createCashflow({ length: 0 }), id: 'asdkj', amount: 100, increaseRate: 0, target: 'savings' },
    ];
    const additions = getAdditions(cashflows, 'savings');
    expect(additions).toBe(100);
  });

  test('read multiple amounts', () => {
    const cashflows = [
      { ...createCashflow({ length: 0 }), id: 'asdkj', amount: 100, increaseRate: 0, target: 'savings' },
      { ...createCashflow({ length: 1 }), id: 'asdzz', amount: 150, increaseRate: 0, target: 'savings' },
      { ...createCashflow({ length: 2 }), id: 'asdzz', amount: 150, increaseRate: 0, target: '401k' },
    ];
    const additions = getAdditions(cashflows, 'savings');
    expect(additions).toBe(250);
  });

  test('calulate increase', () => {
    const cashflows = [
      { ...createCashflow({ length: 0 }), id: 'asdkj', amount: 100, increaseRate: .5, target: 'savings' },
    ];
    const years = 1;
    const additions = getAdditions(cashflows, 'savings', years);
    expect(additions).toBe(150);
  });

  test('read amount from source', () => {
    const cashflows = [
      { ...createCashflow({ length: 0 }), id: 'asdkj', amount: 100, increaseRate: .5, source: 'savings' },
    ];
    const years = 1;
    const additions = getAdditions(cashflows, 'savings', years);
    expect(additions).toBe(-150);
  });

  test('start on start, end on end', () => {
    const cashflows = [
      { ...createCashflow({ length: 0 }), id: 'asdkj', amount: 100, increaseRate: 0, target: 'savings', start: 2, end: '3' },
    ];
    const additions = [];
    for (let year = 0; year < 5; year++) {
      additions.push(getAdditions(cashflows, 'savings', year));
    }
    expect(additions).toEqual([0, 0, 100, 100, 0]);
  });

});

describe('getProjection', () => {

  let counter = 2399433;
  const rand = (num) => { counter += num;  return counter % num; };
  const adj = ['happy', 'playful', 'smart' , 'excessive', 'confused', 'illiterate'];
  const nouns = ['human', 'monster', 'orca' , 'octopus', 'cat', 'planet'];
  const genName = () => `${adj[rand(adj.length)]}_${rand(nouns.length)}_${rand(200)}`;

  const genAcc = (balance = 10, interestRate=0, id=uuid()) => ({ ...createAccount({ name: genName() }), id, balance, interestRate  });
  const genCash = (target, amount = 10, increaseRate=0) => ({ ...createCashflow({ name: genName() }), amount, increaseRate, target });

  test('all zeros', () => {
    const projection = getProjection({
      accounts:  { list: [genAcc(0, 0, 'a'), genAcc(0, 0, 'b')] },
      cashflows: { list: [genCash('a', 0), genCash('b', 0)] },
    });

    expect(projection).toEqual(Array(70).fill(0))
  });

  test('all ten', () => {
    const projection = getProjection({
      accounts:  { list: [genAcc(10, 0, 'a'), genAcc(0, 0, 'b')] },
      cashflows: { list: [genCash('a', 0), genCash('b', 0)] },
    });

    expect(projection).toEqual(Array(70).fill(10))
  });

  test('cashflow change', () => {
    const projection = getProjection({
      accounts:  { list: [genAcc(10, 0, 'a')] },
      cashflows: { list: [{ ...genCash('a', 0), changes: [{ period: 10, amount: 100 }] }] },
    });

    expect(projection).toEqual(Array(10).fill(10).concat(Array(60).fill(0).map((t, i) => 110 + i * 100)));
  });
});
