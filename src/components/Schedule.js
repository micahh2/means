import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as schedActions from '../actions/schedule';
import { getEvents } from '../selectors/schedule';

export class _Schedule extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const events = this.props.events;

    return (<div className="form-fill">
        <table className="form-section">
          <thead>
            <tr>
              <td>Name</td>
              <td>Modification</td>
              <td>Section</td>
              <td>Target</td>
              <td>Year</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
          {
            events.map((event, index) => (
              <tr key={'event'+index}>
              <td> 
                <input onChange={this.props.updateEvent(event.id, 'name')} value={event.name} />
              </td>
              <td>
                <div onChange={this.props.updateEvent(event.id, 'modType')}>
                  <input id={index+"modTypeAdd"} type="radio"
                    checked={event.modType === 'add'}
                    value="add" name={index+"modType"}
                  />
                  <label htmlFor={index+"modTypeAdd"}>Add</label>
                  <input id={index+"modTypeChange"} type="radio"
                    checked={event.modType === 'change'}
                    value="change" name={index+"modType"}
                  />
                  <label htmlFor={index+"modTypeChange"}>Change</label>
                  <input id={index+"modTypeDelete"} type="radio"
                    checked={event.modType === 'delete'}
                    value="delete" name={index+"modType"}
                  />
                  <label htmlFor={index+"modTypeDelete"}>Delete</label>
                </div>
              </td>
              <td>
                <select onChange={this.props.updateEvent(event.id, 'targetType')} value={event.targetType}>
                  <option value={-1}>Select</option>
                  <option value="cashflow">Cashflow</option>
                </select>
              </td>
              <td>
                <select
                  onChange={this.props.updateEvent(event.id, 'target')}
                  value={event.target}
                  hidden={!event.collection.length}
                >
                  <option value={-1} >Select</option>
                  {
                    event.collection.map((t, index) => (
                      <option key={'target'+index} value={t.id}>
                        {t.name}
                      </option>
                    ))
                  }
                </select>
                <span hidden={event.collection.length}>
                  _
                </span>
              </td>
              <td>
                <input
                  type="number"
                  onChange={this.props.updateEvent(event.id, 'period')}
                  value={event.period}
                />
              </td>
              <td>
                <button className="delete-button" onClick={this.props.deleteEvent(event.id)}>Delete</button>
              </td>
              </tr>))
          }
          </tbody>
        </table>
        <button onClick={this.props.addEvent()} title="Add">+</button>
      </div>);
  }
}

_Schedule.propTypes = {
  events: PropTypes.array,
  updateEvent: PropTypes.func,
  addEvent: PropTypes.func,
  deleteEvent: PropTypes.func,
};

export const mapStateToProps = (state) => ({
  events: getEvents(state),
});

export const mapDispatchToProps = (dispatch) => ({
  updateEvent: (id, prop) => (event) => {
    const value = typeof event === 'object' ? event.target.value : event;
    dispatch(schedActions.updateEvent({ id, prop, value }));
  },
  addEvent: () => () => {
    dispatch(schedActions.addEvent());
  },
  deleteEvent: (id) => () => {
    dispatch(schedActions.deleteEvent({ id }));
  },
});

export const Schedule = connect(mapStateToProps, mapDispatchToProps)(_Schedule);

