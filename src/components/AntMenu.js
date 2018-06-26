import React from 'react';
import classNames from 'classnames';
import { PropTypes } from 'prop-types';

import '../styles/ant-menu.scss';

export function AntMenu(props) {
  return (<div>
    <div className="antmenu-dots">...</div>
    <div className="antmenu-popup">
      <div className={classNames({
        "antmenu-popup-box": true,
        "open": props.open
      })}>
        { props.children }
      </div>
    </div>
  </div>);
}

AntMenu.propTypes = {
  open: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};
