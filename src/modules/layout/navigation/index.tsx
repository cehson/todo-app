import React, {useState} from 'react';
import SignedInLinks from './signedInLinks/index';
import SignedOutLinks from './signedOutLinks/index';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './style/style.scss';
import FacebookImage from './faceimage';

const Navigation: React.FC = (props) => {

	return (
		<div className='main-nav'>
			<nav className='navbar'>
				<div className='row display_flex-justifyBetween' style={{flex: 1}}>
					<div className='display_flex display_flex-justifyBetween' style={{flex: 1}}>
						<ul className='navbar-menu'>
							<li className='navbar-item' style={{color: 'white'}}>

								Welcome: {props.profileImage ? <FacebookImage source={props.profileImage}/> : ''}

								{props && props.userName[0] && props.userName[1] ? ` ${props.userName[0]} ${props.userName[1]}` : 'Anonimus'}
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		isLogedIn: state.firebase.auth.uid || state.signIn.logedInWithFacebook ? true : false,
		userName: [state.firebase.profile.firstName, state.firebase.profile.lastName],
		profileImage: state.firebase.auth.photoURL
	};
};

export default connect(mapStateToProps)(Navigation);
