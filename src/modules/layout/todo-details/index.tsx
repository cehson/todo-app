import React from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {deleteTodo, finishTodo} from './redux/actions';
import {withRouter} from 'react-router';
import {compose} from 'redux';
import Todo from './redux/types';
import './style/style.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoDetail: React.FC<Todo> = (props) => {

	const {todo, id, creatorID, todoStatus} = props;
	const deleteTodo = () => {

		if (id) {
			props.deleteTodo(id, creatorID, props.history);
		}
	};

	const finishTodo = () => {
		props.finishTodo(id, todoStatus, creatorID, props.history);
	};

	if (todo) {
		return (
			<section className='section'>
				<div className='container'>
					<div className='todoWrapper'>
						<span>Todo:</span><h2 className='title margin_b_2'> {todo.content}</h2>
						<span>Status:</span><h3 className='subtitle  margin_b_2'>
						{todo.finished ? 'Finished' : 'Not finished'}
					</h3>
						<span>Author:</span>
						<h3 className='margin_b_2'>
							{todo.authorFirstName} {todo.authorLastName}
						</h3>
						<span>Scheduled time:</span>    <p className='margin_b_2'><strong>{new Date(todo.scheduledTime).toDateString()}</strong></p>
						<div className='buttons' style={{paddingTop: 50 + 'px'}}>
							<button onClick={finishTodo} className='button is-primary'>{todo.finished ? 'Reopen' : 'Finish'}</button>
							<button onClick={deleteTodo} className='button is-danger'>Delete</button>
						</div>
					</div>
				</div>
				<ToastContainer autoClose={2000} />
			</section>
		);
	} else {
		return (
			<section className='section'>
				<div className='container'>
					<h1 className='title'>Todo not found!</h1>
				</div>
				<ToastContainer autoClose={1000} />
			</section>
		);
	}
};

const mapStateToProps = (state: { firebase: { auth: { uid: any; }; }; firestore: { data: { todos: any; }; }; }, ownProps: { match: { params: { id: any; }; }; }) => {
	const id = ownProps.match.params.id;
	const logeidInUserID = state.firebase.auth.uid;
	let todos;
	if (logeidInUserID) {
		todos = state.firestore.data.todos;
	} else {
		todos = JSON.parse(localStorage.getItem('todos') as string);
	}

	const todo = todos ? todos[id] : null;
	const creatorID = todos && todo ? todo.creatorID : null;
	const todoStatus = todos && todo ? todo.finished : null;

	return {
		id,
		todo: todo,
		creatorID,
		todoStatus,
		logeidInUserID: state.firebase.auth.uid
	};
};

const mapDispatchToProps = (dispatch: { (arg0: (dispatch: (arg0: { type: string; id: number; }) => void, getState: any, { getFirestore, getFirebase }: any) => void): void; (arg0: (dispatch: any, getState: any, { getFirestore, getFirebase }: { getFirestore: any; getFirebase: any; }) => void): void; }) => {
	return {
		deleteTodo: (id: number, creatorID: number, history: string[]) => dispatch(deleteTodo(id, creatorID, history)),
		finishTodo: (id: number, creatorID: any, todoStatus: any, history: string[]) => dispatch(finishTodo(id, todoStatus, creatorID, history))
	};
};

export default  withRouter<any, any>(compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect([{collection: 'todos'}])
)(TodoDetail));
