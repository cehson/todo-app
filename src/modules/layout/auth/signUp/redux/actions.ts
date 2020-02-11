export const signUp = (newUser, ownProps) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {

		const firebase = getFirebase();
		const firestore = getFirestore();

		firebase.auth().createUserWithEmailAndPassword(
			newUser.email,
			newUser.password
		).then((response) => {
			return firestore.collection('users').doc(response.user.uid).set({
				firstName: newUser.name,
				lastName: newUser.surname,
				email: newUser.email,
				todos: []
			}).then((res) => {
				ownProps.history.push('/');
				dispatch({type: 'SIGNUP_SUCCESS'});
			})
				.catch((err) => {
					dispatch({type: 'SIGNUP_ERROR'}, err);
				});
		});
	};

};

export const signUpWithFacebook = (ownProps) => {
	return (dispatch, getState, {getFirebase, getFirestore}) => {
		const firebase = getFirebase();
		const firestore = getFirestore();

		let provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result) {
			// The signed-in user info.
			let name = result.user.displayName.split(' ')[0];
			let surname =  result.user.displayName.split(' ')[1];
			return firestore.collection('users').doc(result.user.uid).set({
				firstName : name,
				lastName : surname,
				email : result.user.email,
				todos: []
			}).then(function() {
				ownProps.history.push('/');
				dispatch({type: 'SIGNUP_SUCCESS'});
			});
		}).catch(res => {
			console.log(res);
		});
	};
};
