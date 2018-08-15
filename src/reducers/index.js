import { combineReducers } from 'redux';
import counter from './counter';
import auth from './auth';
import user from './user';
import categories from './categories';
import accounts from './accounts';
import transactions from './transactions';


export default combineReducers({
  counter,
  auth,
  user,
  categories,
  accounts,
  transactions,
});
