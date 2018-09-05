import React from 'react';
import { Accounts } from './Accounts';
import { Cashflows } from './Cashflows';
import { Taxes } from './Taxes';
import { Schedule } from './Schedule';

import '../styles/form.scss';


export function Form() {
  return (<div className="form-main">
    <h2 className="form-accounts-title">Accounts</h2>
    <Accounts />

    <h2>Cashflows</h2>
    <Cashflows />

    <h2>Taxes</h2>
    <Taxes />

    <h2>Schedule</h2>
    <Schedule />
  </div>);
}
