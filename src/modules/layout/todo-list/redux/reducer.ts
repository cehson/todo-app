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
			console.log('todo deleted!' + action.id);
			return {...state};
		case 'UPDATE_TODO' :
			console.log('UPDATE SUCCESFULL');
			return {...state};

		case 'CREATE_TODO_ERROR' :
			console.log('Error creating!' + action.err);

		default :
			return state;
	}
};

export default todoListReducer;
