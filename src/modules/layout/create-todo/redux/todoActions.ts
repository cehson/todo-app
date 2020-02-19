import { toast } from 'react-toastify';
export const createTodo = (todo, isLogedIn, ownProps) => {
	return (dispatch: any, getState: any, {getFirestore, getFirebase}) => {
		// make async call to database
		const firestore = getFirestore();
		const firebase = getFirebase();

		if (!isLogedIn) {
			firestore.collection('todos').add({
				...todo,
				authorFirstName: todo.authorFirstName,
				authorLastName: todo.authorLastName,
				finished: false,
				scheduledTime: todo.scheduledTime
			}).then((res: any) => {
				let todoId = res.id;
				let user = res.parent.firestore._firestoreClient.credentials.currentUser.uid;
				let userRef = firestore.collection('users').doc(user);
				let todoArray = [];
				todoArray.push(todoId);
				userRef.update({
					todos: firebase.firestore.FieldValue.arrayUnion(...todoArray)
				});
				dispatch({type: 'CREATE_TODO', todo: todo});
				toast.success("TODO created succesfully!Redirecting to todo list...");
				setTimeout(() => {
					ownProps.history.push('/');
				}, 1200);
			}).catch((err) => {
				dispatch({type: 'CREATE_TODO_ERROR', err});
				toast.error("ERROR OCURED CREATING A TODO");
			});
		} else {
			let todos = JSON.parse(localStorage.getItem('todos'));
			if (todos == null) todos = [];
			todos.push(todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			ownProps.history.push('/');
			toast.success("TODO CREATED SUCCESSFULY");
		}
	};
};
