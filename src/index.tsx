import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import signInReducer from './modules/layout/auth/signIn/redux/signInReducer';
import signUpReducer from './modules/layout/auth/signUp/redux/signUpReducer';
// import todoListReducer from './modules/layout/todo-list/redux/reducer';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {createFirestoreInstance, reduxFirestore, getFirestore, firestoreReducer} from 'redux-firestore';
import {ReactReduxFirebaseProvider, getFirebase, firebaseReducer, isLoaded} from 'react-redux-firebase';
import firebase from './const/firebase';
import thunk from 'redux-thunk';
import {Provider, useSelector} from 'react-redux';

const rootReducer = combineReducers({
	signIn: signInReducer,
	signUp: signUpReducer,
	// todoList: todoListReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer
});

// We enhance compose in order to use Redux DevTools extension
// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create config for rrfProps object. We need this to pass it in the ReactReduxFirebaseProvider component
const rrfConfig = {
	useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
	userProfile: 'users',
	attachAuthIsReady: true,
};

const middlewares = [
	thunk.withExtraArgument({getFirestore, getFirebase})
];
const config = {
	userProfile: "users"
};
const store = createStore(rootReducer,
	composeEnhancers(
		applyMiddleware(...middlewares),
		reduxFirestore(firebase)
	));

const rrfProps = {
	firebase,
	config: rrfConfig,
	dispatch: store.dispatch,
	userProfile: 'users',
	useFirestoreForProfile: true,
	createFirestoreInstance, // Create firestore instead of craete it in fbConfig.js
};

// Waiting for firebase auth to initialize to render the app.
const AuthIsLoaded = ({children}) => {
	const auth = useSelector(state => state.firebase.auth);
	if (!isLoaded(auth)) return <div>Loading app...</div>;
	return children;
};
ReactDOM.render(
	<Provider store={store}>
		<ReactReduxFirebaseProvider {...rrfProps}>
			<AuthIsLoaded>
				<App/>
			</AuthIsLoaded>
		</ReactReduxFirebaseProvider>
	</Provider>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
