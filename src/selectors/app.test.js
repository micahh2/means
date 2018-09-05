import { uuid } from '../helpers/uuid';
import { getProjection, getAdditions } from './app';
import { createCashflow } from '../reducers/cashflows';

describe('getAdditions', () => {

  test('read amount', () => {
    const cashflows = [
      { ...createCashflow({ length: 1 }), id: 'asdkj', amount: 100, increaseRate: 0, target: 'savings' },
    ];
    const additions = getAdditions(cashflows, 'savings');
    expect(additions).toBe(100);
  });

  test('read multiple amounts', () => {
    const cashflows = [
      { ...createCashflow({ length: 1 }), id: 'asdkj', amount: 100, increaseRate: 0, target: 'savings' },
      { ...createCashflow({ length: 1 }), id: 'asdzz', amount: 150, increaseRate: 0, target: 'savings' },
      { ...createCashflow({ length: 1 }), id: 'asdzz', amount: 150, increaseRate: 0, target: '401k' },
    ];
    const additions = getAdditions(cashflows, 'savings');
    expect(additions).toBe(250);
  });

  test('calulate increase', () => {
    const cashflows = [
      { ...createCashflow({ length: 1 }), id: 'asdkj', amount: 100, increaseRate: .5, target: 'savings' },
    ];
    const years = 1;
    const additions = getAdditions(cashflows, 'savings', years);
    expect(additions).toBe(150);
  });

});

describe('getProjection', () => {

  let counter = 2399433;
  const rand = (num) => { counter += num;  return counter % num; };
  const adj = ['happy', 'playful', 'smart' , 'excessive', 'confused', 'illiterate'];
  const nouns = ['human', 'monster', 'orca' , 'octopus', 'cat', 'planet'];
  const genName = () => `${adj[rand(adj.length)]}_${rand(nouns.length)}_${rand(200)}`;

  const genAcc = (balance = 10, interestRate=0, id=uuid()) => ({ id, name: genName(), balance, interestRate  });
  const genCash = (target, amount = 10, increaseRate=0) => ({ ...createCashflow({ title: genName() }), amount, increaseRate, target });

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
});
