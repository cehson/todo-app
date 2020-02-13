import React from 'react';
import Dashboard from './modules/layout/dashboard/index';
import Navigation from './modules/layout/navigation/index';
import TodoDetails from './modules/layout/todo-details/index';
import SignIn from './modules/layout/auth/signIn/index';
import CreateTodo from './modules/layout/create-todo/index';
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
			<Switch>
				<main className='page_wrapper'>
					<div className='page_wrapper__inner'>
						<div className='layout'>
							<Navigation/>
							<div className='menu'>
								{links}
							</div>
							<Route exact path='/' component={Dashboard}/>
							<Route path='/todo/:id' component={TodoDetails}/>
							<Route path='/signin/' component={SignIn}/>
							<Route path='/signup/' component={SignUp}/>
							<Route path='/create/' component={CreateTodo}/>
						</div>
					</div>
				</main>
			</Switch>
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
