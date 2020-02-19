import React, {useState} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {createTodo} from './redux/todoActions';
import CheckForm from '../../../const/checkForm';
import Todo from '../todo-details/redux/types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style/style.scss';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';

const CreateTodo: React.FC = (props) => {

	const [startDate, setStartDate] = useState(new Date());
	const stateSchema = {
		content: {value: '', error: ''}
	};
	const validationStateSchema = {
		content: {
			required: true,
			validator: {
				regEx: /^[\s\S]{0,100}$/,
				error: 'Invalid content!'
			}
		}
	};

	const onSubmitForm = () => {

		if (state.content.value && state.content.value.length) {

			props.createTodo({
					content: state.content.value,
					scheduledTime: +startDate,
					creatorID: props.loggedInUserID,
					authorFirstName: props.authorFirstName,
					authorLastName: props.authorLastName,
					finished: false
				},
				props.isLogedIn
		);
		} else {
			toast.error('PLEASE FILL UP THE FORM CORRECTLY!');
			setTimeout(() => {
			}, 1100);
		}

	};

	const handleDateChange = (date: Date) => {
		setStartDate(date);
	};

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
		<div style={{gridArea: 'container'}}>
			<div className='createForm'>
				<h1 className='margin_t_2 title is-1'>Create Todo</h1>
				<form className='margin_t_2' onSubmit={handleOnSubmit}>
					<div className='field'>
						<label className='label'>Todo content</label>
						<div className='control has-icons-left has-icons-right'>
							<input className='input'
								   name='content'
								   type='text'
								   placeholder='Todo content'
								   value={state.content.value}
								   onChange={handleOnChange}
							/>
							<span className='icon is-small is-left'>
                                <i className='fas fa-content fa-xs'></i>
                            </span>
							{state.content.error && <p style={errorStyle}>{state.content.error}</p>}
						</div>
					</div>
					<div className='field'>
						<label className='label'>Scheduled time</label>
						<div className='control has-icons-left has-icons-right'>
							<DatePicker selected={startDate} onChange={handleDateChange}/>
							<span className='icon is-small is-left'>
                                <i className='fas fa-clock fa-xs'></i>
                            </span>
						</div>
					</div>
					<div className='field is-grouped margin_t_2'>
						<p className='control'>
							<button type='submit' disabled={disable} className='button is-primary'>
								Submit
							</button>
						</p>
					</div>
				</form>
			</div>
			<ToastContainer autoClose={1100}/>
		</div>
	);
};

const mapDispatchToProps = (dispatch, ownProps) => {
	// what ever property we want to add to PROPS of the compoent we add to object property
	// in our case createTodo action (e.g props.createTodo will call that function)
	return {
		createTodo: (todo: Todo, isLogedIn: boolean) => {
			dispatch(createTodo(todo, isLogedIn, ownProps));
		}

		// whit this, when we call prop.createTodo, and pass "todo", it will call createTodo action through dispatch, and will call
		// createTodo action creator passing the todo !

	};
};

const mapStateToProps = (state: any) => {
	return {
		loggedInUserID: state.firebase.auth.uid,
		authorFirstName: state.firebase.profile.firstName,
		authorLastName: state.firebase.profile.lastName,
		isLogedIn: state.firebase.profile.isEmpty
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateTodo));
