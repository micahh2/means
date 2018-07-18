import {
  addTax,
  deleteTax,
  updateTax,
  addTaxBracket,
  deleteTaxBracket,
  updateTaxBracket
} from '../actions/taxes';

export function getTargets(state) {
  return [].concat(state.accounts.list).concat(state.cashflows.list);
}

export const mapStateToProps = (state) => ({
  targets: getTargets(state),
  taxes: state.taxes.list,
});

export const mapDispatchToProps = (dispatch) => ({
  updateTax: (id, prop) => (event) => {
    const value = typeof event === 'object' ? event.target.value : event;
    dispatch(updateTax({ id, prop, value }));
  },
  updateTaxBracket: (id, index, prop) => (event) => {
    const value = typeof event === 'object' ? event.target.value : event;
    dispatch(updateTaxBracket({ id, index, prop, value }));
  },
  addTax: () => () => {
    dispatch(addTax());
  },
  addTaxBracket: (id) => () => {
    dispatch(addTaxBracket({ id }));
  },
  deleteTax: (id) => () => {
    dispatch(deleteTax({ id }));
  },
  deleteTaxBracket: (id, index) => () => {
    dispatch(deleteTaxBracket({ id, index }));
  },
});


