import React, { Component } from "react";
import { connect } from "react-redux";
import { selectUser, selectAccount } from "../actions/index";

import { bindActionCreators } from "redux";

import { Link } from "react-router-dom";

class UserDetail extends Component {
  render() {
    if (!this.props.user) {
      return <div>Please select a user...</div>;
    }
    const { id } = this.props.match.params;
    let accounts = this.props.user.accounts.map(account => {
      return (
        <div key={account.id}>
          <Link
            onClick={() => this.props.selectAccount(account)}
            to={`/users/${id}/${account.id}`}
          >
            {account.accountType}
          </Link>
        </div>
      );
    });
    return (
      <div className="col-md-6">
        <div className="card">
          <div className="card-block">
            <h4 className="card-title">Account Information</h4>
            <h6 className="card-subtitle mb-2 text-muted">
              {this.props.user.name}
            </h6>
            <div className="card-text">
              <div>
                {this.props.user.email}
              </div>
              <div>
                {this.props.user.phone}
              </div>
              <div>
                {this.props.user.address}
              </div>
            </div>
            {accounts}
          </div>
          <Link className="btn btn-primary" to="/users">
            Back to List of Users
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.selectedUser,
    account: state.selectedAccount
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectAccount: selectAccount,
      selectUser: selectUser
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
