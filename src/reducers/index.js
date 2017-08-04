import { combineReducers } from "redux";
import {
  USER_SELECTED,
  ACCOUNT_SELECTED,
  WITHDRAW_FUNDS
} from "../actions/index";
import userList from "../data/users";
import _ from "lodash";
// import update from 'immutability-helper';

const initialState = {
  users: userList(),
  selectedUser: null,
  selectedAccount: null
};

let newState;

const reducer = function(state = initialState, action) {
  switch (action.type) {
    case USER_SELECTED:
      let userId = action.payload;

      newState = _.cloneDeep(state);
      newState.selectedUser = userList().find(element => {
        return element._id == userId;
      });
      return newState;

    case ACCOUNT_SELECTED:
      newState = _.cloneDeep(state);
      newState.selectedAccount = action.payload;
      return newState;

    case WITHDRAW_FUNDS:
      newState = _.cloneDeep(state);
      const userIdx = newState.users.findIndex(
        user => user._id === state.selectedUser
      );
      const accountIdx = newState.users[userIdx].accounts.findIndex(
        account => account.id === state.selectedAccount
      );
      newState.users[userIdx].accounts[accountIdx].balance -= action.payload;
      return newState;

    default:
      return state;
  }
};

export default reducer;
