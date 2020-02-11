import React, {useState} from 'react';
import {useStore} from 'react-redux';
import TodoList from '../todo-list/index';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {firestoreConnect} from 'react-redux-firebase';
import './style/style.scss';

const Dashboard: React.FC = ({todoList, userList, loggedInUserID}) => {
	// ========= state ==================

	let todoLista = [];

	function compare(a, b) {
		const timeA = a.scheduledTime;
		const timeB = b.scheduledTime;
		let comparison = 0;
		if (timeA > timeB) {
			comparison = -1;
		} else if (timeA < timeB) {
			comparison = 1;
		}
		return comparison;
	}

	if (loggedInUserID) {
		if (todoList && todoList.todos) {
			todoLista = todoList.todos.sort(compare).filter((el) => {
				return el.creatorID === loggedInUserID;
			});
		}
	} else {
		todoLista =  JSON.parse( localStorage.getItem( 'todos' ) )
	}

	return (
		<div>
			<TodoList creatorUID={loggedInUserID} todos={todoLista}/>
		</div>
	);
};

export default compose(
	firestoreConnect([{collection: 'todos'}]),
	connect((state) => ({
		todoList: state.firestore.ordered,
		userList: state.signIn.loggedInUserData,
		loggedInUserID: state.firebase.auth.uid
	})))(Dashboard);

