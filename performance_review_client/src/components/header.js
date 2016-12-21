/**
 * Created by Terry on 2016-11-29.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { signoutUser } from '../actions/auth';

class Header extends Component {
    renderLinks() {
        if (this.props.authenticate) {
            // show a link to sign out
            return (
                <li key="1" className="nav-item">
                    <Link className="nav-link" onClick={this.props.signoutUser}>Sign Out</Link>
                </li>
            );
        } else {
            // show a link to sign in or sign up
            return [
                <li key="1" className="nav-item">
                    <Link className="nav-link" to="/signin">Sign in</Link>
                </li>,
            ];
        }
    }
    render() {
        return (
            <nav className="navbar navbar-light">
                <Link to="/" className="navbar-brand">Paytm</Link>
                <ul className="nav navbar-nav">
                    {this.renderLinks()}
                </ul>
                {this.props.authenticate ?
                    <ul className="nav navbar-nav navbar-right">
                        <li key="1" className="nav-item"><h3>Hello, {localStorage.getItem('name')}</h3></li>
                    </ul>
                    : undefined}
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticate: state.auth.authenticate
    };
}

export default connect(mapStateToProps, {signoutUser})(Header);