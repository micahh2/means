import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { InputPercent } from './InputPercent';
import { CashflowSettings } from './CashflowSettings';
import * as cashActions from '../actions/cashflows';
import { getMoreCashflow } from '../selectors/cashflows';

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
          <td># per year</td>
          <td></td>
        </tr>
        </thead>
        <tbody>
        {
          cashflows.map((cashflow, index) => (
            <tr key={'cashflow'+index}>
              <td> 
                <input onChange={this.props.updateCashflow(cashflow.id, 'name')} value={cashflow.name} />
              </td>
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
                <select onChange={this.props.updateCashflow(cashflow.id, 'target')} value={cashflow.target}>
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
                <input
                  type="number"
                  onChange={this.props.updateCashflow(cashflow.id, 'recurrance')}
                  value={cashflow.recurrance}
                />
              </td>
              <td>
                <button className="end-button" onClick={this.props.setMoreCashflowId(cashflow.id)}>&#x2699; Settings</button>
              </td>
            </tr>))
        }
        </tbody>
      </table>
      <button onClick={this.props.addCashflow()} title="Add">+</button>
      <CashflowSettings
        period="Year"
        cashflow={this.props.moreCashflow}
        accounts={this.props.accounts}
        updateCashflow={this.props.updateCashflow}
        updateCashflowChange={this.props.updateCashflowChange}
        addCashflowChange={this.props.addCashflowChange}
        deleteCashflowChange={this.props.deleteCashflowChange}
        deleteCashflow={this.props.deleteCashflow}
        close={this.props.clearMoreCashflowId}
      />
    </div>);
  }
}

_Cashflows.propTypes = {
  accounts: PropTypes.array,
  cashflows: PropTypes.array,
  moreCashflow: PropTypes.object,

  updateCashflow: PropTypes.func,
  updateCashflowChange: PropTypes.func,
  setMoreCashflowId: PropTypes.func,
  addCashflow: PropTypes.func,
  deleteCashflow: PropTypes.func,
  addCashflowChange: PropTypes.func,
  deleteCashflowChange: PropTypes.func,
  clearMoreCashflowId: PropTypes.func,
};

export const mapStateToProps = (state) => ({
  accounts: state.accounts.list,
  cashflows: state.cashflows.list,
  moreCashflow: getMoreCashflow(state),
});

export const mapDispatchToProps = (dispatch) => ({
  setMoreCashflowId: (id) => () => {
    dispatch(cashActions.setMoreCashflowId({ id }));
  },
  updateCashflow: (id, prop) => (event) => {
    const value = typeof event === 'object' ? event.target.value : event;
    dispatch(cashActions.updateCashflow({ id, prop, value }));
  },
  updateCashflowChange: (id, changeId,  prop) => (event) => {
    const value = typeof event === 'object' ? event.target.value : event;
    dispatch(cashActions.updateCashflowChange({ id, changeId,  prop, value }));
  },
  addCashflowChange: (id) => () => {
    dispatch(cashActions.addCashflowChange({ id }));
  },
  addCashflow: () => () => {
    dispatch(cashActions.addCashflow());
  },
  deleteCashflow: (id) => () => {
    dispatch(cashActions.deleteCashflow({ id }));
  },
  deleteCashflowChange: (id, changeId) => () => {
    dispatch(cashActions.deleteCashflowChange({ id, changeId }));
  },
  clearMoreCashflowId: () => () => {
    dispatch(cashActions.clearMoreCashflowId());
  },
});

export const Cashflows = connect(mapStateToProps, mapDispatchToProps)(_Cashflows);

