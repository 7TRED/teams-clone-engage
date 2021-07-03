import React from 'react';
import ReactLoading from 'react-loading';
import ReactDOM from 'react-dom';

function Loader (props) {
	return (
		<div
			style={{
				position        : 'absolute',
				top             : 0,
				left            : 0,
				width           : '100%',
				height          : '100vh',
				display         : 'flex',
				justifyContent  : 'center',
				alignItems      : 'center',
				backgroundColor : '#222',
			}}
		>
			<ReactLoading type="spin" color="#f7f7f7">
				<h3 style={{ color: '#f7f7f7' }}>Loading</h3>
			</ReactLoading>
		</div>
	);
}

export default Loader;
