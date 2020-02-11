import React, {useState} from 'react';
import SignedInLinks from './signedInLinks/index';
import SignedOutLinks from './signedOutLinks/index';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

const Navigation: React.FC = (props) => {
	let links = null;
	if (props.isLogedIn) {
		links = <SignedInLinks/>;
	} else {
		links = <SignedOutLinks/>;
	}
	return (
		<div className='main-nav'>
			<nav className='navbar is-primary'>
				<div className='container'>
					<div className='row display_flex-justifyBetween' style={{flex: 1}}>
						<div className='display_flex display_flex-justifyBetween' style={{flex: 1}}>
							<ul className='navbar-menu'>
								<li className='navbar-item'>
									<Link to='/'>
										Todo List
									</Link>
								</li>
							</ul>
							{links}
						</div>
					</div>
				</div>
			</nav>
		</div>

	);
};

const mapStateToProps = (state) => {
	return {
		isLogedIn: state.firebase.auth.uid || state.signIn.logedInWithFacebook ? true : false
	};
};

export default connect(mapStateToProps)(Navigation);
