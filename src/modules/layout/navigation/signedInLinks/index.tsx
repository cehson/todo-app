import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signOut} from '../../auth/signIn/redux/actions';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const SignedInLinks: React.FC = (props) => {
	return (
		<ul className='sidebarMenu'>
			<li>
				<Link to='/'>
					<FontAwesomeIcon icon='list-ul'/>
					<h5>Todos</h5>
				</Link>
			</li>
			<li>
				<Link to='/create/'>
					<FontAwesomeIcon icon='plus-circle'/>
					<h5>Create</h5>
				</Link>
			</li>
			<li style={{marginTop: 'auto'}}>
				<a onClick={props.signOut}>
					<FontAwesomeIcon icon='sign-out-alt'/>
					<h5>Sign out</h5>
				</a>
			</li>
		</ul>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	};
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
