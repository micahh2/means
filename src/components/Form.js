import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AntMenu } from './AntMenu';
import * as actions from '../actions/form';

import '../styles/form.scss';

export const randomId = (prefix) => `${prefix}_${Math.random() * 100000}`;

export class _Form extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const accounts = this.props.accounts;
    return (<div className="form-main">
      <h2 className="form-accounts-title">Accounts</h2>
      <table className="form-accounts">
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
                <input
                  type="number"
                  onChange={this.props.updateAccount(account.id, 'additions')}
                  value={account.additions}
                />
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
              <AntMenu open={true} onClick={this.props.toggleAntMenu(account.id)}>
                <button>Delete</button>
              </AntMenu>
              </td>
            </tr>))
        }
        </tbody>
      </table>
      <button onClick={this.props.addAccount()} title="Add">+</button>
    </div>);
  }
}

_Form.propTypes = {
  accounts: PropTypes.array,
  updateAccount: PropTypes.func,
  addAccount: PropTypes.func,
  toggleAntMenu: PropTypes.func,
};

export const mapStateToProps = (state) => ({
  accounts: state.accounts.list
});

export const mapDispatchToProps = (dispatch) => ({
  updateAccount: (id, prop) => (value) => {
    dispatch(actions.updateAccount({ id, prop, value: value.target.value }));
  },
  addAccount: () => () => {
    dispatch(actions.addAccount());
  },
  toggleAntMenu: (id) => () => {
    dispatch(actions.toggleAntMenu({ id }));
  }
});

export const Form = connect(mapStateToProps, mapDispatchToProps)(_Form);
