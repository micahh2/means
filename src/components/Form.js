import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as accActions from '../actions/accounts';
import * as cashActions from '../actions/cashflows';
import { getAdditions } from '../selectors/app';

import '../styles/form.scss';


export class _Form extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const accounts = this.props.accounts;
    const cashflows = this.props.cashflows;

    return (<div className="form-main">
      <h2 className="form-accounts-title">Accounts</h2>
      <table className="form-section">
        <thead>
          <tr>
            <td>Name</td>
            <td>Contributions</td>
            <td>Interest Rate</td>
            <td>Balance</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
        {
          accounts.map((account, index) => (
            <tr key={'account'+index}>
              <td> {account.name} </td>
              <td>
                { getAdditions(cashflows, account.id) }
              </td>
              <td>
              <input
                type="number"
                onChange={this.props.updateAccount(account.id, 'interestRate')}
                value={account.interestRate}
              />
              </td>
              <td>
              <input
                type="number"
                onChange={this.props.updateAccount(account.id, 'balance')}
                value={account.balance}
              />
              </td>
              <td>
                <button onClick={this.props.deleteAccount(account.id)}>Delete</button>
              </td>
            </tr>))
        }
        </tbody>
      </table>
      <button onClick={this.props.addAccount()} title="Add">+</button>

      <h2>Cashflows</h2>
      <table className="form-section">
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
                <input
                  type="number"
                  onChange={this.props.updateCashflow(cashflow.id, 'increaseRate')}
                  value={cashflow.increaseRate}
                />
              </td>
              <td>
                <select onChange={this.props.updateCashflowTarget(cashflow.id)}>
                  <option value={null} selected={cashflow.target===null}>Select</option>
                  {
                    accounts.map((t, index) => (
                      <option key={'target'+index} value={t.id} selected={cashflow.target===t.id}>
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

_Form.propTypes = {
  accounts: PropTypes.array,
  updateAccount: PropTypes.func,
  addAccount: PropTypes.func,
  deleteAccount: PropTypes.func,

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
  updateAccount: (id, prop) => (value) => {
    dispatch(accActions.updateAccount({ id, prop, value: value.target.value }));
  },
  addAccount: () => () => {
    dispatch(accActions.addAccount());
  },
  deleteAccount: (id) => () => {
    dispatch(accActions.deleteAccount({ id }));
  },

  updateCashflow: (id, prop) => (event) => {
    dispatch(cashActions.updateCashflow({ id, prop, value: parseFloat(event.target.value) }));
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

export const Form = connect(mapStateToProps, mapDispatchToProps)(_Form);
