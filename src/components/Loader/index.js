import React from 'react';
import { CircularProgress } from '@material-ui/core';
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
			<CircularProgress />
		</div>
	);
}

export default Loader;
