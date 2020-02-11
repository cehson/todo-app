import React from 'react';
import useInput from '../../../../const/useForm';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {signUp} from './redux/actions';
import  {signUpWithFacebook} from './redux/actions';
import FacebookLogin from 'react-facebook-login';

const SignUp: React.FC = (props) => {

	const {value: name, bind: bindName, reset: resetName} = useInput('');
	const {value: surname, bind: bindSurname, reset: resetSurname} = useInput('');
	const {value: email, bind: bindEmail, reset: resetEmail} = useInput('');
	const {value: password, bind: bindPassword, reset: resetPassword} = useInput('');

	const handleSubmit = (event) => {
		event.preventDefault();
		resetEmail();
		resetName();
		resetSurname();
		resetPassword();

		const newUser = {
			name: name,
			surname: surname,
			email: email,
			password: password
		};
		props.signUp(newUser);
	};

	const facebookSignUp = () => {
			props.signUpWithFacebook();
	};

	return (
		<div className='container'>
			<h1 className='margin_t_2 title is-1'>Sign up form</h1>
			<form onSubmit={handleSubmit}>
				<div className='field'>
					<label className='label'>Your name</label>
					<div className='control has-icons-left has-icons-right'>
						<input className='input' name='name' type='text' placeholder='Your Name' {...bindName} />
						<span className='icon is-small is-left'>
                            <i className='fas fa-person fa-xs'></i>
                        </span>
					</div>
				</div>
				<div className='field'>
					<label className='label'>Your surname</label>
					<div className='control has-icons-left has-icons-right'>
						<input className='input' name='surname' type='text' placeholder='Your surname' {...bindSurname} />
						<span className='icon is-small is-left'>
                            <i className='fas fa-person fa-xs'></i>
                        </span>
					</div>
				</div>
				<div className='field'>
					<label className='label'>Your email</label>
					<div className='control has-icons-left has-icons-right'>
						<input className='input' name='email' type='email' placeholder='Email' {...bindEmail} />
						<span className='icon is-small is-left'>
                            <i className='fas fa-envelope fa-xs'></i>
                        </span>
					</div>
				</div>
				<div className='field margin_t_2'>
					<label className='label'>Your password</label>
					<div className='control has-icons-left has-icons-right'>
						<input className='input' name='password' type='password' placeholder='Password' {...bindPassword} />
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
						callback={facebookSignUp}
						icon="fa-facebook"
						textButton='SIGN UP'
					/>
				</div>
			</form>

		</div>
	);
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		signUp: (newUser) => {
			dispatch(signUp(newUser, ownProps));
		},
		signUpWithFacebook: () => {
			dispatch(signUpWithFacebook(ownProps));
		}
	};
};

export default withRouter(connect(null, mapDispatchToProps)(SignUp));
