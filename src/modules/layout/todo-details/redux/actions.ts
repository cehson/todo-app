import {toast} from "react-toastify";

export const deleteTodo = (id: number, creatorID: number, history) => {
	alert('are you sure you want to delete this todo?');
	return (dispatch, getState, {getFirestore, getFirebase}) => {
		const firestore = getFirestore();
		const firebase = getFirebase();
		if (creatorID) {

			firestore.collection('todos').doc(id).delete().then((res) => {
				let userRef = firestore.collection('users').doc(creatorID);
				userRef.update({
					todos: firebase.firestore.FieldValue.arrayRemove(id)
				});
				dispatch({type: 'DELETE_TODO', id: creatorID});
				if (history) history.push('/');
			}).catch((err) => {
				toast.error('ERROR DELETING TODO OCCURED! ' + err.message);
			});
		} else {
			let localStorageTodos = JSON.parse(localStorage.getItem('todos'));
			localStorageTodos.splice(id, 1);
			localStorage.setItem('todos', JSON.stringify(localStorageTodos));
			if (history) history.push('/');

		}
	};
};

export const finishTodo = (id: number, creatorID, todoStatus) => {
	return (dispatch: any, getState: any, {getFirestore, getFirebase}) => {
		if (creatorID) {
			const firestore = getFirestore();
			firestore.collection('todos').doc(id).update({finished: !todoStatus}).then(
				() => {
					dispatch({type: 'UPDATE_TODO'});
					toast.success('UPDATE SUCCESSFULL');
				}
			);
		} else {
			let localStorageTodos = JSON.parse(localStorage.getItem('todos'));
			localStorageTodos[id].finished = !localStorageTodos[id].finished;
			localStorage.setItem('todos', JSON.stringify(localStorageTodos));
		}
	};
};
