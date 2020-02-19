import React from 'react';
import Dashboard from './modules/layout/dashboard/index';
import Navigation from './modules/layout/navigation/index';
import TodoDetails from './modules/layout/todo-details/index';
import SignIn from './modules/layout/auth/signIn/index';
import CreateTodo from './modules/layout/create-todo/index';
import NotFound from './modules/layout/404/404';
import SignUp from './modules/layout/auth/signUp';
import {BrowserRouter, Switch, Route, Redirect, useHistory} from 'react-router-dom';
import SignedInLinks from './modules/layout/navigation/signedInLinks';
import SignedOutLinks from './modules/layout/navigation/signedOutLinks';
import {connect} from 'react-redux';
import './App.scss';
import './assets/styles/style.scss';

const App: React.FC = (props) => {
	let links;
	if (props.isLogedIn) {
		links = <SignedInLinks/>;
	} else {
		links = <SignedOutLinks/>;
	}
	return (
		<BrowserRouter>
			<main className='page_wrapper'>
				<div className='page_wrapper__inner'>
					<div className='layout'>
						<Navigation/>
						<div className='menu'>
							{links}
						</div>
						<Switch>
							<Route key='home' exact path='/' component={Dashboard}/>
							<Route key='todo' path='/todo/:id' component={TodoDetails}/>
							<Route key='signin' path='/signin/' component={SignIn}/>
							<Route key='signup' path='/signup/' component={SignUp}/>
							<Route key='create' path='/create/' component={CreateTodo}/>
							<Route key='not_found' component={NotFound}/>
						</Switch>
					</div>
				</div>
			</main>

		</BrowserRouter>

	);
};
const mapStateToProps = (state) => {
	return {
		isLogedIn: state.firebase.auth.uid || state.signIn.logedInWithFacebook ? true : false,
		userName: [state.firebase.profile.firstName, state.firebase.profile.lastName],
		profileImage: state.firebase.auth.photoURL
	};
};
export default connect(mapStateToProps)(App);
