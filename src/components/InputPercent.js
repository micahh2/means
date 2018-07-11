import React from 'react';
import { PropTypes } from 'prop-types';

export function InputPercent(props) {
  const onChange = (event) => { 
    const newVal = parseFloat(event.target.value);
    props.onChange(isNaN(newVal) ? event.target.value : (newVal / 100));
  }
  const getValue = () => {
    if (typeof props.value !== 'number') { return ''; }
    return props.value * 100;
  }

  return (<div>
    <input type="number" value={getValue()} onChange={onChange} />
    <span>%</span>
  </div>);
}
InputPercent.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
