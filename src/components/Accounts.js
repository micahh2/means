import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as accActions from '../actions/accounts';
import { getAdditions } from '../selectors/app';
import { InputPercent } from './InputPercent';

export class _Accounts extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const accounts = this.props.accounts;
    const cashflows = this.props.cashflows;
    return (<div className="form-fill">
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
                <InputPercent
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
                <button className="delete-button" onClick={this.props.deleteAccount(account.id)}>Delete</button>
              </td>
              </tr>))
          }
          </tbody>
        </table>
        <button onClick={this.props.addAccount()} title="Add">+</button>
      </div>);
  }
}

_Accounts.propTypes = {
  accounts: PropTypes.array,
  updateAccount: PropTypes.func,
  addAccount: PropTypes.func,
  deleteAccount: PropTypes.func,

  cashflows: PropTypes.array,
};

export const mapStateToProps = (state) => ({
    accounts: state.accounts.list,
    cashflows: state.cashflows.list
});

export const mapDispatchToProps = (dispatch) => ({
  updateAccount: (id, prop) => (event) => {
    const value = typeof event === 'object' ? event.target.value : event;
    dispatch(accActions.updateAccount({ id, prop, value }));
  },
  addAccount: () => () => {
    dispatch(accActions.addAccount());
  },
  deleteAccount: (id) => () => {
    dispatch(accActions.deleteAccount({ id }));
  },
});

export const Accounts = connect(mapStateToProps, mapDispatchToProps)(_Accounts);

