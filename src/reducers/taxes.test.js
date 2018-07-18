import { updateTaxBracket, deleteTaxBracket } from '../actions/taxes';
import { reducer, initialState } from './taxes';

describe('Taxes Reducer', () => {

  test('Update Tax Bracket should update stuff', () => {
    const id = initialState.list[0].id;
    const newState = reducer(initialState, updateTaxBracket({ id, index: 0, prop: 'threshold', value: 2831  }));
    expect(newState.list[0].brackets[0].threshold).toBe(2831);
  });

  test('Delete Tax Bracket', () => {
    const id = initialState.list[0].id;
    const newState = reducer(initialState, deleteTaxBracket({ id }));
    expect(newState.list[0].brackets.length).toBe(0);
  });

});
