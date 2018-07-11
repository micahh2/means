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
              <td>Bracket</td>
              <td>Rate</td>
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
                          <InputPercent
                            onChange={this.props.updateTaxBracket(tax.id, bracket.id, 'threshold')}/>
                        </td>
                        <td>
                          <InputPercent
                            onChange={this.props.updateTaxBracket(tax.id, bracket.id, 'taxRate')}/>
                        </td>
                        </tr>))
                      }
                    </tbody>
                  </table>
              </td>
              <td>
                <select
                  onChange={this.props.updateTax(tax.id, 'target')}
                  value={tax.target}
                >
                  { targets.map((t, subIndex) => <option key={'tax' + index +'target' + subIndex} value={t.id}>{ t.name }</option>) }
                </select>
              </td>
              <td>
                <button onClick={this.props.deleteTax(tax.id)}>Delete</button>
              </td>
              <td>
                <button onClick={this.props.deleteTax(tax.id)}>Delete</button>
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

