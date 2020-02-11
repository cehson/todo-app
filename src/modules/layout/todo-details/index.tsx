import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {deleteTodo, finishTodo} from './redux/actions';
import {withRouter} from 'react-router';
import {compose} from 'redux';

const TodoDetail: React.FC = (props) => {

	const {todo, id, creatorID, todoStatus} = props;


	const deleteTodo = () => {
		props.deleteTodo(id, creatorID);
	};

	const finishTodo = () => {
		props.finishTodo(id, todoStatus);
	};

	if (todo) {
		return (
			<section className='section'>
				<div className='container'>
					<h2 className='title'>Todo: {todo.content}</h2>
					<h2 className='subtitle'>
						Status: {todo.finished ? 'Finished' : 'Not finished'}
					</h2>
					<h2>
						Author: {todo.authorFirstName} {todo.authorLastName}
					</h2>
					<p>Scheduled time: <strong>{new Date(todo.scheduledTime).toDateString()}</strong></p>
					<div className='buttons' style={{paddingTop: 50 + 'px'}}>
						<button onClick={finishTodo} className='button is-primary'>{todo.finished ? 'Reopen' : 'Finish'}</button>
						<button onClick={deleteTodo} className='button is-danger'>Delete</button>
					</div>
				</div>
			</section>
		);
	} else {
		return (
			<section className='section'>
				<div className='container'>
					<h1 className='title'>Loading Todo!</h1>
				</div>
			</section>
		);
	}
};

const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const todos = state.firestore.data.todos;
	const todo = todos ? todos[id] : null;
	const creatorID = todos && todo ? todo.creatorID : null;
	const todoStatus = todos && todo ? todo.finished : null;
	return {
		id,
		todo: todo,
		creatorID,
		todoStatus
	};
};

const mapDispatchToProps = (dispatch, id, creatorID, ownProps) => {
	return {
		deleteTodo: (id, creatorID, ownProps) => dispatch(deleteTodo(id, creatorID, ownProps)),
		finishTodo: (id, todoStatus) => dispatch(finishTodo(id, todoStatus))
	};
};

export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([{collection: 'todos'}])
)(TodoDetail);
