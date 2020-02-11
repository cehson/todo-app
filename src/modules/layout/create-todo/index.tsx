import React, {useState} from 'react';
import useForm from '../../../const/useForm';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import {createTodo} from './redux/todoActions';
import Todo from '../todo-details/redux/types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const CreateTodo = (props) => {

	const {value: content, bind: bindcontent, reset: resetcontent} = useForm('');

	const [startDate, setStartDate] = useState(new Date());
	const handleSubmit = (evt: any) => {
		evt.preventDefault();

		props.createTodo({
				content: content,
				scheduledTime: + startDate,
				creatorID: props.loggedInUserID,
				authorFirstName: props.authorFirstName,
				authorLastName: props.authorLastName,
				finished: false
			},
			// tslint:disable-next-line:indent
			 props.isLogedIn
		);
		resetcontent();
	};

	const handleDateChange = (date: Date) => {
		setStartDate(date);
	}

	return (
		<div>
			<div className='container'>
				<h1 className='margin_t_2 title is-1'>Create</h1>
				<form onSubmit={handleSubmit}>
					<div className='field'>
						<label className='label'>Todo content</label>
						<div className='control has-icons-left has-icons-right'>
							<input className='input' name='content' type='text' placeholder='Todo content'   {...bindcontent} />
							<span className='icon is-small is-left'>
                                <i className='fas fa-content fa-xs'></i>
                            </span>
						</div>
					</div>
					<div className='field margin_t_2'>
						<label className='label'>Scheduled time</label>
						<div className='control has-icons-left has-icons-right'>
							<DatePicker selected={startDate} onChange={handleDateChange} />
							<span className='icon is-small is-left'>
                                <i className='fas fa-clock fa-xs'></i>
                            </span>
						</div>
					</div>
					<div className='field is-grouped margin_t_2'>
						<p className='control'>
							<button type='submit' className='button is-primary'>
								Submit
							</button>
						</p>
					</div>
				</form>

			</div>
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
	console.log(state);
	return {
		loggedInUserID: state.firebase.auth.uid,
		authorFirstName: state.firebase.profile.firstName,
		authorLastName: state.firebase.profile.lastName,
		isLogedIn: state.firebase.profile.isEmpty
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateTodo));
