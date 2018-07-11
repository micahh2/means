import React, { Component } from 'react';
import c3 from 'c3';
import { PropTypes } from 'prop-types';

import 'c3/c3.css';
import '../styles/graph.scss';

export class Graph extends Component {

  constructor(props) {
    super(props);
    const chartId = 'chartId' + Math.floor(Math.random() * 100000);
    this.state = { chartId };
  }

  componentDidMount() {
    const title = 'net-worth';
    this.chart = c3.generate({
      bindto: `#${this.state.chartId}`,
      data: {
        columns: [
          [title, 30, 200, 100, 400, 150, 250],
        ],
        types: {
          [title]: 'area-spline',
        },
        colors: {
          [title]: '#13AA30',
        }
      },
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.chart.load({
        columns: [
          ['net-worth', ...this.props.data]
        ]
      });
    }
  }

  render() {
    return (<div
      style={{width: "100%", height: "100%"}}
      className="graph-cont"
      id={this.state.chartId}
    />);
  }
}

Graph.propTypes = {
  data: PropTypes.array,
};

