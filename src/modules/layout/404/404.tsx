import React from 'react';
import './style/style.scss';
import {Link} from 'react-router-dom';

const NotFound = () => (
	<div className='page_not_found'>
		<div className="page_not_found--inner">
			<h1>PAGE NOT FOUND!</h1>
			<Link to='/'>
				<button className='button is-primary margin_t_2'>Return to Home Page</button>
			</Link>
		</div>
	</div>
);

export default NotFound;
