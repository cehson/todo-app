import React, {useState} from 'react'
import useInput from '../../../../const/useForm'
import {withRouter} from 'react-router'
import {connect} from 'react-redux'
import {signIn} from './redux/actions'
import {signInWithFacebook} from './redux/actions'
import firebase from '../../../../const/firebase'
import FacebookLogin from 'react-facebook-login'

const SignIn: React.FC = (props) => {

	const {value: email, bind: bindEmail, reset: resetEmail} = useInput('');
	const {value: password, bind: bindPassword, reset: resetPassword} = useInput('');

	const handleSubmit = (event) => {
		event.preventDefault();
		props.signIn({
				email,
				password
			}
		);
		resetEmail();
		resetPassword();
	};
	const signInWithFacebook = () => {
		props.signInWithFacebook();
	};


const {authError} = props;

return (
	<div className='container' style={{gridArea: 'container' }}>
		<h1 className='margin_t_2 title is-1'>Sign in form</h1>
		<form method='POST' onSubmit={handleSubmit}>
			<div className='field'>
				<label className='label'>Your email</label>
				<div className='control has-icons-left has-icons-right'>
					<input className='input' name='email' type='email' placeholder='Email'  {...bindEmail} />
					<span className='icon is-small is-left'>
                            <i className='fas fa-envelope fa-xs'></i>
                        </span>
				</div>
			</div>
			<div className='field margin_t_2'>
				<label className='label'>Your password</label>
				<div className='control has-icons-left has-icons-right'>
					<input className='input' name='password' type='password' placeholder='Password'  {...bindPassword} />
					<span className='icon is-small is-left'>
                            <i className='fas fa-lock fa-xs'></i>
                        </span>
				</div>
			</div>
			<div className='field is-grouped margin_t_2'>
				<p className='control'>
					<button type='submit' className='button is-primary'>
						Submit
					</button>
				</p>
				<FacebookLogin
					appId='1090411071306906'
					autoLoad={false}
					fields='name,email,picture'
					scope='public_profile'
					callback={signInWithFacebook}
				/>
			</div>
			{authError ? <p>Error Ocured while trying to log in !</p> : null}
		</form>
	</div>
);
}
;

const mapStateToProps = (state) => {
	return {
		authError: state.signIn.authError
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		signIn: (credentials) => dispatch(signIn(credentials, ownProps)),
		signInWithFacebook: () => dispatch(signInWithFacebook(ownProps))
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
