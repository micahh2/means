import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { InputPercent } from './InputPercent';
import { mapStateToProps, mapDispatchToProps } from '../selectors/taxes';

export class _Taxes extends React.Component {
  render() {
    const targets = this.props.targets;
    const taxes = this.props.taxes;

    return (<div className="form-fill">
        <table className="form-section">
          <thead>
            <tr>
              <td>Name</td>
              <td>Bracket & Rate</td>
              <td></td>
              <td>Increase Rate</td>
              <td>Target</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
          {
            taxes.map((tax, index) => (
              <tr key={'tax'+index}>
              <td> {tax.name} </td>
              <td colSpan="2">
                <table>
                  <tbody>
                      { 
                        tax.brackets.map((bracket, subIndex) => (<tr key={'tax' +index + 'bracket' + subIndex}>
                        <td>
                          <input
                            type="number"
                            value={bracket.threshold}
                            onChange={this.props.updateTaxBracket(tax.id, subIndex, 'threshold')}/>
                        </td>
                        <td>
                          <InputPercent
                            value={bracket.rate}
                            onChange={this.props.updateTaxBracket(tax.id, subIndex, 'rate')}/>
                        </td>
                        </tr>))
                      }
                      <tr>
                        <td>
                          <button onClick={this.props.addTaxBracket(tax.id)}>+</button>
                        </td>
                        <td>
                          <button onClick={this.props.deleteTaxBracket(tax.id)}>-</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
              </td>
              <td>
                <InputPercent
                  value={tax.increaseRate}
                  onChange={this.props.updateTax(tax.id, 'increaseRate')}/>
              </td>
              <td>
                <select
                  onChange={this.props.updateTax(tax.id, 'target')}
                  value={tax.target}
                >
                  <option value={-1}>Select</option>
                  { targets.map((t, subIndex) => <option key={'tax' + index +'target' + subIndex} value={t.id}>{ t.name }</option>) }
                </select>
              </td>
              <td>
                <button className="delete-button" onClick={this.props.deleteTax(tax.id)}>Delete</button>
              </td>
            </tr>))
          }
          </tbody>
        </table>
        <button onClick={this.props.addTax()} title="Add">+</button>
      </div>);
  }
}

_Taxes.propTypes = {
  targets: PropTypes.array,
  taxes: PropTypes.array,

  updateTax: PropTypes.func,
  updateTaxBracket: PropTypes.func,
  addTax: PropTypes.func,
  deleteTax: PropTypes.func,
  addTaxBracket: PropTypes.func,
  deleteTaxBracket: PropTypes.func,
};

export const Taxes = connect(mapStateToProps, mapDispatchToProps)(_Taxes);

