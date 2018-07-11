import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { InputPercent } from './InputPercent';
import * as cashActions from '../actions/cashflows';

export class _Cashflows extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const accounts = this.props.accounts;
    const cashflows = this.props.cashflows;
    return (<div className="form-section">
      <table className="form-fill">
        <thead>
        <tr>
          <td>Name</td>
          <td>Amount</td>
          <td>Increase Rate</td>
          <td>Target</td>
          <td></td>
        </tr>
        </thead>
        <tbody>
        {
          cashflows.map((cashflow, index) => (
            <tr key={'cashflow'+index}>
              <td> {cashflow.name} </td>
              <td>
                <input
                  type="number"
                  onChange={this.props.updateCashflow(cashflow.id, 'amount')}
                  value={cashflow.amount}
                />
              </td>
              <td>
                <InputPercent
                  onChange={this.props.updateCashflow(cashflow.id, 'increaseRate')}
                  value={cashflow.increaseRate}
                />
              </td>
              <td>
                <select onChange={this.props.updateCashflowTarget(cashflow.id)} value={cashflow.target}>
                  <option value={-1} >Select</option>
                  {
                    accounts.map((t, index) => (
                      <option key={'target'+index} value={t.id}>
                      {t.name}
                      </option>
                    ))
                  }
                </select>
              </td>
              <td>
                <button onClick={this.props.deleteCashflow(cashflow.id)}>Delete</button>
              </td>
            </tr>))
        }
        </tbody>
      </table>
        <button onClick={this.props.addCashflow()} title="Add">+</button>
      </div>);
  }
}

_Cashflows.propTypes = {
  accounts: PropTypes.array,

  cashflows: PropTypes.array,
  updateCashflow: PropTypes.func,
  updateCashflowTarget: PropTypes.func,
  addCashflow: PropTypes.func,
  deleteCashflow: PropTypes.func,
};

export const mapStateToProps = (state) => ({
    accounts: state.accounts.list,
    cashflows: state.cashflows.list
});

export const mapDispatchToProps = (dispatch) => ({
  updateCashflow: (id, prop) => (event) => {
    const value = typeof event === 'object' ? event.target.value : event;
    dispatch(cashActions.updateCashflow({ id, prop, value: parseFloat(value) }));
  },
  updateCashflowTarget: (id) => (event) => {
    dispatch(cashActions.updateCashflow({ id, prop: 'target', value: event.target.value }));
  },
  addCashflow: () => () => {
    dispatch(cashActions.addCashflow());
  },
  deleteCashflow: (id) => () => {
    dispatch(cashActions.deleteCashflow({ id }));
  },
});

export const Cashflows = connect(mapStateToProps, mapDispatchToProps)(_Cashflows);

