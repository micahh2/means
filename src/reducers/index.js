import { combineReducers } from 'redux';
import * as fromAccounts from './accounts';

 export default combineReducers({
   accounts: fromAccounts.reducer
 });
