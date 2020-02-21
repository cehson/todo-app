import {toast} from 'react-toastify';

export const deleteTodo = (id: number, creatorID: number, history: string[]) => {
	alert('are you sure you want to delete this todo?');
	return (dispatch: (arg0: { type: string; id: number; }) => void, getState: any, {getFirestore, getFirebase}: any) => {
		const firestore = getFirestore();
		const firebase = getFirebase();
		if (creatorID) {
			firestore.collection('todos').doc(id).delete().then(() => {
				let userRef = firestore.collection('users').doc(creatorID);
				userRef.update({
					todos: firebase.firestore.FieldValue.arrayRemove(id)
				});
				dispatch({type: 'DELETE_TODO', id: creatorID});
				toast.error('TODO deleted!');
				if (history) history.push('/');
			}).catch((err: { message: string; }) => {
				toast.error('ERROR DELETING TODO OCCURED! ' + err.message);
			});
		} else {
			let localStorageTodos = JSON.parse(<string>localStorage.getItem('todos'));
			localStorageTodos.splice(id, 1);
			localStorage.setItem('todos', JSON.stringify(localStorageTodos));
			setTimeout(() => {
				if (history) history.push('/');
			}, 2000);
		}
	};
};

export const finishTodo = (id: number, creatorID: any, todoStatus: any, history: string[]) => {

	// @ts-ignore
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
			let localStorageTodos = JSON.parse(<string>localStorage.getItem('todos'));
			localStorageTodos[id].finished = !localStorageTodos[id].finished;
			localStorage.setItem('todos', JSON.stringify(localStorageTodos));
			toast.success('UPDATE SUCCESSFULL');
			setTimeout(() => {
				if (history) history.push('/');
			}, 2000);

		}
	};
};
