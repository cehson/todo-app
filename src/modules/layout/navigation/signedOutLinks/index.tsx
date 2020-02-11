import React from 'react';
import {Link} from 'react-router-dom';

const SignedOutLinks: React.FC = (props) => {
	return (
		<ul className='navbar-menu display_flex display_flex-justify-content--flex-end'>
			<li className='navbar-item'>
				<Link to='/create/'>
					Create
				</Link>
			</li>
			<li className='navbar-item'>
				<Link to='/signin/'>
					Sign in
				</Link>
			</li>
			<li className='navbar-item'>
				<Link to='/signup/'>
					Sign up
				</Link>
			</li>
		</ul>
	);
};

export default SignedOutLinks;
