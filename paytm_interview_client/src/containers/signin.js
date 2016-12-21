/**
 * Created by Terry on 2016-12-20.
 */
import React, { Component } from 'react';
import SigninForm from '../components/signinForm';
import { connect } from 'react-redux';
import { signinUser } from '../actions/auth';

class Signin extends Component {
    constructor(props) {
        super(props);
        //this.handleSignin = this.handleSignin.bind(this);
    }

    handleSignin(props) {
        console.log("saving performance", props);
        //this.props.signinUser(props);
    }

    render() {
        return (
            <div>
                <SigninForm onSubmit={this.props.signinUser}/>
                {this.props.error ? <h3 className="text-center">{this.props.error}</h3> : undefined }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        error: state.auth.error
    };
}

export default connect(mapStateToProps, {signinUser})(Signin);