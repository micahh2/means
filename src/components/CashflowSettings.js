import React from 'react';
import PropTypes from 'prop-types';
import { InputPercent } from './InputPercent';

export function CashflowSettings(props) {
  const cashflow = props.cashflow;
  const period = props.period;
  const accounts = props.accounts;

  if (!cashflow) { return null; }

  return (<div>
    <div className="popup-shadow" onClick={props.close()}></div>
    <div className="popup-content">
      <h2><i>{cashflow.name}</i></h2>
      <div className="form-sub-section">
        <h3>Settings</h3>
        <label htmlFor="cashflowStart">Start {period}</label>
        <input type="number" id="cashflowStart" onChange={props.updateCashflow(cashflow.id, 'start')} value={cashflow.start} />

        <label htmlFor="cashflowEnd">End {period}</label>
        <input type="number" id="cashflowEnd" onChange={props.updateCashflow(cashflow.id, 'end')} value={cashflow.end} />
      </div>
      <div className="form-sub-section-gray">
        <h3>Changes</h3>
        <table className="form-fill">
          <thead>
          <tr>
            <td>{period}</td>
            <td>Amount</td>
            <td>Increase Rate</td>
            <td>Target</td>
            <td># per {period.toLowerCase()}</td>
            <td></td>
          </tr>
          </thead>
          <tbody>
          {
            cashflow.changes.map((change, index) => (
              <tr key={'cashflowChange'+index}>
                <td>
                  <input
                    type="number"
                    onChange={props.updateCashflowChange(cashflow.id, change.id, 'period')}
                    value={change.period}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    onChange={props.updateCashflowChange(cashflow.id, change.id, 'amount')}
                    value={change.amount}
                  />
                </td>
                <td>
                  <InputPercent
                    onChange={props.updateCashflowChange(cashflow.id, change.id, 'increaseRate')}
                    value={change.increaseRate}
                  />
                </td>
                <td>
                  <select onChange={props.updateCashflowChange(cashflow.id, change.id, 'target')} value={change.target}>
                    <option value={-1} >_</option>
                    {
                      accounts.map((t, index) => (
                        <option key={'changeTarget'+index} value={t.id}>
                          {t.name}
                        </option>
                      ))
                    }
                  </select>
                </td>
                <td>
                  <input
                    type="number"
                    onChange={props.updateCashflowChange(cashflow.id, change.id, 'recurrance')}
                    value={change.recurrance}
                  />
                </td>
                <td>
                  <button className="delete-button" onClick={props.deleteCashflowChange(cashflow.id, change.id)}>Delete</button>
                </td>
              </tr>))
          }
          </tbody>
        </table>
        <button onClick={props.addCashflowChange(cashflow.id)} title="Add Change">Add Change</button>
      </div>
      <div className="form-sub-section">
        <button onClick={props.deleteCashflow(cashflow.id)} title="Delete Cashflow">Delete Cashflow</button>
      </div>
    </div>
  </div>);
}

CashflowSettings.propTypes = {
  period: PropTypes.string,
  accounts: PropTypes.array,
  cashflow: PropTypes.object,

  updateCashflowChange: PropTypes.func,
  addCashflowChange: PropTypes.func,
  deleteCashflowChange: PropTypes.func,
  updateCashflow: PropTypes.func,
  deleteCashflow: PropTypes.func,
  close: PropTypes.func,
};

