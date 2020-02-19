import React, {useState} from 'react';
import useInput from '../../../../const/useForm';
import CheckForm from '../../../../const/checkForm';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {signIn} from './redux/actions';
import {signInWithFacebook} from './redux/actions';
import FacebookLogin from 'react-facebook-login';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';

const SignIn: React.FC = (props) => {

		const stateSchema = {
			email: {value: '', error: ''},
			password: {value: '', error: ''}
		};
		const validationStateSchema = {
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
					regEx: /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/,
					error: 'Invalid password.'
				}
			}
		};

		const handleSubmit = () => {
				props.signIn({
						email: state.email.value,
						password: state.password.value
					}
				);
		};

		const signInWithFacebook = () => {
			props.signInWithFacebook();
		};

		const {state, handleOnChange, handleOnSubmit, disable} = CheckForm(
			stateSchema,
			validationStateSchema,
			handleSubmit
		);
		const errorStyle = {
			color: 'red',
			fontSize: '13px',
			marginTop: '6px'
		};

		const {authError} = props;

		return (
			<div className='container' style={{gridArea: 'container'}}>
				<h1 className='margin_t_2 title' style={{textAlign: 'center'}}>Sign in form</h1>
				<form className='signInForm margin_t_2' method='POST' onSubmit={handleOnSubmit}>
					<div className='field'>
						<label className='label'>Your email</label>
						<div className='control has-icons-left has-icons-right'>
							<input
								className='input'
								name='email'
								type='email'
								placeholder='Email'
								value={state.email.value}
								onChange={handleOnChange}
							/>
							<span className='icon is-small is-left'>
                            <i className='fas fa-envelope fa-xs'></i>
                        </span>
							{state.email.error && <p style={errorStyle}>{state.email.error}</p>}
						</div>
					</div>
					<div className='field'>
						<label className='label'>Your password</label>
						<div className='control has-icons-left has-icons-right'>
							<input
								className='input'
								name='password'
								type='password'
								placeholder='Password'
								value={state.password.value}
								onChange={handleOnChange}
							/>
							<span className='icon is-small is-left'>
                            <i className='fas fa-lock fa-xs'></i>
                        </span>
							{state.password.error && <p style={errorStyle}>{state.password.error}</p>}
						</div>
					</div>
					<div className='field is-grouped margin_t_2'>
						<p className='control'>
							<button type='submit' className='button is-primary' disabled={disable}>
								Submit
							</button>
						</p>
						<FacebookLogin
							appId='1090411071306906'
							autoLoad={false}
							fields='name,email,picture'
							cssClass='button is-facebook'
							scope='public_profile'
							callback={signInWithFacebook}
						/>
					</div>
					{authError ? <p style={{color: 'red'}}>Error Ocured while trying to log in !</p> : null}
				</form>
				<ToastContainer autoClose={2100}/>
			</div>
		);
	}
;

const mapStateToProps = (state: { signIn: { authError: any; }; }) => {
	return {
		authError: state.signIn.authError
	};
};

const mapDispatchToProps = (dispatch: { (arg0: (dispatch: any, getState: any, {getFirebase, getFirestore}: { getFirebase: any; getFirestore: any; }) => void): void; (arg0: (dispatch: any, getState: any, {getFirebase, getFirestore}: { getFirebase: any; getFirestore: any; }) => void): void; }, ownProps: any) => {
	return {
		signIn: (credentials: any) => dispatch(signIn(credentials, ownProps)),
		signInWithFacebook: () => dispatch(signInWithFacebook(ownProps))
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
