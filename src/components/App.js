import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Graph } from './Graph';
import { Form } from './Form';
import { getProjection } from '../selectors/app';

import '../styles/app.scss';

export const _App = (props) => {
  return <div>
    <h1 className="app-title">Friendly Title</h1>
    <div className="app-main">
      <div className="app-graph">
        <Graph data={props.projection} />
      </div>
      <div className="app-form">
        <Form />
      </div>
    </div>
  </div>;
}

_App.propTypes = {
  projection: PropTypes.array,
};

const mapStateToProps = (state) => ({
  projection: getProjection(state) 
});

export const App = connect(mapStateToProps)(_App);
