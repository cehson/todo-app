import React, {useState} from 'react';
import CheckForm from '../../../../const/checkForm';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {signUp} from './redux/actions';
import './style/style.scss';
import User from './types/types'
import {signUpWithFacebook} from './redux/actions';
import FacebookLogin from 'react-facebook-login';


const SignUp: React.FC = (props) => {

	const stateSchema = {
		name: {value: '', error: ''},
		surname: {value: '', error: ''},
		email: {value: '', error: ''},
		password: {value: '', error: ''}
	};

	const validationStateSchema = {
		name: {
			required: true,
			validator: {
				regEx: /^[a-zA-Z]+$/,
				error: 'Invalid first name format.'
			}
		},
		surname: {
			required: true,
			validator: {
				regEx: /^[a-zA-Z]+$/,
				error: 'Invalid last name format.'
			}
		},
		email: {
			required: true,
			validator: {
				regEx: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
				error: 'Invalid email format.'
			}
		},
		password: {
			required: true,
			validator: {
				regEx: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
				error: 'Invalid password.'
			}
		}
	};

	const facebookSignUp = () => {
		props.signUpWithFacebook();
	};

	function onSubmitForm(state: User) {
		const newUser = {
			name: state.name.value,
			surname: state.surname.value,
			email: state.email.value,
			password: state.password.value
		};
		props.signUp(newUser);
	}

	const {state, handleOnChange, handleOnSubmit, disable} = CheckForm(
		stateSchema,
		validationStateSchema,
		onSubmitForm
	);
	const errorStyle = {
		color: 'red',
		fontSize: '13px'
	};

	return (
		<div className='container' style={{gridArea: 'container'}}>
			<h1 className='margin_t_2' style={{textAlign: 'center'}}>Sign up form</h1>
			<form className='signUpForm margin_t_2' onSubmit={handleOnSubmit}>
				<div className='field'>
					<label className='label'>Your name</label>
					<div className='control has-icons-left has-icons-right'>
						<input
							type='text'
							name='name'
							placeholder='Your name'
							value={state.name.value}
							onChange={handleOnChange}
						/>
						<span className='icon is-small is-left'>
                            <i className='fas fa-person fa-xs'></i>
                        </span>
					</div>
					{state.name.error && <p style={errorStyle}>{state.name.error}</p>}
				</div>
				<div className='field'>
					<label className='label'>Your surname</label>
					<div className='control has-icons-left has-icons-right'>
						<input className='input'
							   name='surname'
							   value={state.surname.value}
							   onChange={handleOnChange}
							   type='text'
							   placeholder='Your surname'/>
						<span className='icon is-small is-left'>
                            <i className='fas fa-person fa-xs'></i>
                        </span>
						{state.surname.error && <p style={errorStyle}>{state.surname.error}</p>}
					</div>
				</div>
				<div className='field'>
					<label className='label'>Your email</label>
					<div className='control has-icons-left has-icons-right'>
						<input className='input'
							   name='email'
							   value={state.email.value}
							   onChange={handleOnChange}
							   type='email'
							   placeholder='Email'/>
						<span className='icon is-small is-left'>
                            <i className='fas fa-envelope fa-xs'></i>
                        </span>
						{state.email.error && <p style={errorStyle}>{state.email.error}</p>}
					</div>
				</div>
				<div className='field'>
					<label className='label'>Your password</label>
					<div className='control has-icons-left has-icons-right'>
						<input className='input'
							   name='password'
							   value={state.password.value}
							   onChange={handleOnChange}
							   type='password'
							   placeholder='Password'
						/>
						<span className='icon is-small is-left'>
                            <i className='fas fa-lock fa-xs'></i>
                        </span>
						{state.password.error && <p style={errorStyle}>{state.password.error}</p>}
					</div>
				</div>
				<div className='field is-grouped margin_t_2'>
					<p className='control'>
						<button disabled={disable} type='submit' className='button is-primary'>
							Submit
						</button>
					</p>
					<FacebookLogin
						appId='1090411071306906'
						autoLoad={false}
						fields='name,email,picture'
						scope='public_profile'
						cssClass='button is-facebook'
						callback={facebookSignUp}
						icon='fa-facebook'
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
