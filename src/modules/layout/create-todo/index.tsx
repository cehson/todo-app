import React, {useState} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {createTodo} from './redux/todoActions';
import Todo from '../todo-details/redux/types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './style/style.scss';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CreateTodo {
	content: string;
}

const CreateTodo: React.FC = (props) => {

	const [content, setContent] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [error, setError] = useState(true);
	const [regError, setRegError] = useState(false);

	const regex = RegExp('^.{4,35}$');

	function handleContentChange(e: any) {

		if (e.target.value.length) {
			setContent(e.target.value);
		} else {
			setContent('');
		}
		if (content && content.length && e.target.value.length > 4) {
			setError(false);
		} else {
			setError(true);
		}
		if (!regex.test(content) && !regex.test(e.target.value)) {
			setRegError(true);
		} else {
			setRegError(false);
		}
	}

	const handleDateChange = (date: Date) => {
		setStartDate(date);
	};

	const handleSubmit = (evt: any) => {
		evt.preventDefault();
		if (!content && !content.length) {
			return;
		} else {
			props.createTodo({
					content: content,
					scheduledTime: +startDate,
					creatorID: props.loggedInUserID,
					authorFirstName: props.authorFirstName,
					authorLastName: props.authorLastName,
					finished: false
				},
				props.isLogedIn
			);
		}

	};

	const errorStyle = {
		color: 'red',
		fontSize: '13px',
		marginTop: '7px'
	};

	return (
		<div style={{gridArea: 'container'}}>
			<div className='createForm'>
				<h1 className='margin_t_2 title is-1'>Create Todo</h1>
				<form onSubmit={handleSubmit}>
					<div className='field margin_t_2'>
						<label className='label'>Todo content</label>
						<div className='control has-icons-left has-icons-right'>
							<input value={content} onChange={handleContentChange} className='input' name='content' type='text' placeholder='Todo content'/>
							<span className='icon is-small is-left'>
                                <i className='fas fa-content fa-xs'></i>
                            </span>
						</div>
						{regError && <p style={errorStyle}>Todo must be long between 4 and 35 characters!</p>}
					</div>
					<div className='field'>
						<label className='label'>Scheduled time</label>
						<div className='control has-icons-left has-icons-right'>
							<DatePicker
								selected={startDate}
								minDate={new Date()}
								onChange={handleDateChange}/>
							<span className='icon is-small is-left'>
                                <i className='fas fa-clock fa-xs'></i>
                            </span>
						</div>
					</div>
					<div className='field is-grouped margin_t_2'>
						<p className='control'>
							<button type='submit' className='button is-primary' disabled={error}>
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
