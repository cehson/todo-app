import {TodoList} from './types';

const initState: TodoList = {
	todos: [
		{
			userId: '',
			content: '',
			scheduledTime: '',
			finished: false
		}
	]
};

const todoListReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CREATE_TODO' :
			return {...state};

		case 'DELETE_TODO' :
			return {...state};
		case 'UPDATE_TODO' :
			return {...state};

		case 'CREATE_TODO_ERROR' :

		default :
			return state;
	}
};

export default todoListReducer;
