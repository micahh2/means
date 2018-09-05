import { combineReducers } from 'redux';
import * as fromAccounts from './accounts';
import * as fromCashflows from './cashflows';
import * as fromTaxes from './taxes';
import * as fromSchedule from './schedule';

export default combineReducers({
   accounts: fromAccounts.reducer,
   cashflows: fromCashflows.reducer,
   taxes: fromTaxes.reducer,
   schedule: fromSchedule.reducer,
});
