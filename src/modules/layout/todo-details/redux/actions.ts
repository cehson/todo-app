
export const deleteTodo = (id: number, creatorID: number, ownProps) => {

		return (dispatch, getState, {getFirestore, getFirebase}) => {
			if (creatorID) {
			const firestore = getFirestore();
			const firebase = getFirebase();
			firestore.collection('todos').doc(id).delete().then((res) => {
				dispatch({type: 'DELETE_TODO'});
				let userRef = firestore.collection('users').doc(creatorID);
				userRef.update({
					todos: firebase.firestore.FieldValue.arrayRemove(id)
				});
			}).catch((err) => {
				console.log(err);
			});
		} else {
				let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
				localStorageTodos.splice(id, 1);
				localStorage.setItem('todos', JSON.stringify(localStorageTodos));
				ownProps.history.push('/');
			}
	};
};

export const finishTodo = (id: number, todoStatus) => {
	return (dispatch: any, getState: any, {getFirestore, getFirebase}) => {
		const firestore = getFirestore();
		firestore.collection('todos').doc(id).update({finished: !todoStatus}).then(
			() => {
				dispatch({type: 'UPDATE_TODO'});
			}
		);

	};
};
