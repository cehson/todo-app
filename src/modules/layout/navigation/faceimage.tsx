import React, {useState} from 'react';

const FacebookImage: React.FC = (props) => {

	return (
		<img style={{display: 'block', marginLeft: 10,  marginRight: 10, borderRadius: 99}} src={props.source}/>
	);
};

export default FacebookImage;
