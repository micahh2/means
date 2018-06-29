import { combineReducers } from 'redux';
import * as fromAccounts from './accounts';
import * as fromCashflows from './cashflows';

 export default combineReducers({
   accounts: fromAccounts.reducer,
   cashflows: fromCashflows.reducer
 });
