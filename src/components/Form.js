import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
                  onChange={this.props.updateAccount('additions')}
                  value={account.additions}
                />
              </td>
              <td>
              <input
                type="number"
                onChange={this.props.updateAccount('interestRate')}
                value={account.interestRate}
              />
              </td>
              <td>
              <input
                type="number"
                onChange={this.props.updateAccount('balance')}
                value={account.balance}
              />
              </td>
            </tr>))
        }
        </tbody>
      </table>
    </div>);
  }
}

_Form.propTypes = {
  accounts: PropTypes.array,
  updateAccount: PropTypes.func,
};

export const mapStateToProps = (state) => ({
  accounts: state.accounts.list
});

export const mapDispatchToProps = (dispatch) => ({
  updateAccount: (prop) => (value) => {
    dispatch(actions.updateAccount({ prop, value: value.target.value }))
  }
});

export const Form = connect(mapStateToProps, mapDispatchToProps)(_Form);
