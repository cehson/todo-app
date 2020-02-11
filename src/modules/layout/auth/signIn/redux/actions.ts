export const signIn = (credentials, ownProps) => {

	return (dispatch, getState, {getFirebase, getFirestore}) => {
		const firebase = getFirebase();
		const firestore = getFirestore();
		firebase.auth().signInWithEmailAndPassword(
			credentials.email,
			credentials.password
		).then((res) => {
			const loggedInUserID = res.user.uid;
			firestore.collection('users').doc(loggedInUserID).get().then(
				(res) => {
					let userTodos = res.data().todos;
					firestore.collection('todos')
						.where(firebase.firestore.FieldPath.documentId(), 'in', userTodos)
						.get()
						.then((res) => {
							let data = res.docs.map(function (documentSnapshot) {
								return {...documentSnapshot.data(), id:documentSnapshot.id};
							});
							dispatch({type: 'GET_DATA_FROM_USER', data})
						});
				}
			)
			// IF SUCCESS DISPATCH ACTION "LOGIN_SUCCESS"
			ownProps.history.push('/');
			dispatch({type: 'LOGIN_SUCCESS', res});

		}).catch((err) => {
			dispatch({type: 'LOGIN_ERROR', err});
		});
	};
};

export  const  signInWithFacebook = (ownProps) => {

	return (dispatch, getState, {getFirebase, getFirestore}) => {
		const firebase = getFirebase();
		const firestore = getFirestore();
		let provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider).then(res => {
			// IF SUCCESS DISPATCH ACTION "LOGIN_SUCCESS"
			dispatch({type: 'LOGIN_SUCCESS', res});
			ownProps.history.push('/');
		});

		// ownProps.history.push('/');
		// dispatch({type: 'LOGIN_WITH_FB_SUCCESS'});
	}
}

export const signOut = () => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		firebase.auth().signOut().then(() => {
			dispatch({type: 'SIGNOUT_SUCCESS'});
		});
	};
};
