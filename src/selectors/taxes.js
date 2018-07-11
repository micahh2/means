import * as taxActions from '../actions/taxes';

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
    dispatch(taxActions.updateTax({ id, prop, value }));
  },
  updateTaxBracket: (id, index, prop) => (event) => {
    const value = typeof event === 'object' ? event.target.value : event;
    dispatch(taxActions.updateTaxBracket({ id, index, prop, value }));
  },
  addTax: () => () => {
    dispatch(taxActions.addTax());
  },
  addTaxBracket: (id) => () => {
    dispatch(taxActions.addTaxBracket({ id }));
  },
  deleteTax: (id) => () => {
    dispatch(taxActions.deleteTax({ id }));
  },
  deleteTaxBracket: (id, index) => () => {
    dispatch(taxActions.deleteTax({ id, index }));
  },
});


