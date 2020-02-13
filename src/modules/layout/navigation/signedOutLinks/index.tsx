import React from 'react';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const SignedOutLinks: React.FC = (props) => {
	return (
		<ul className='sidebarMenu' style={{textAlign: 'center'}}>
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
				<Link to='/signin/'>
					<FontAwesomeIcon icon='sign-in-alt'/>
					<h5>Sign in</h5>

				</Link>
			</li>
			<li>
				<Link to='/signup/'>
					<FontAwesomeIcon icon='user-plus'/>
					<h5>Sign up</h5>
				</Link>
			</li>
		</ul>
	);
};

export default SignedOutLinks;
