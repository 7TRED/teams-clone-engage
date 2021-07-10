import React from 'react';
import { CircularProgress, Backdrop, makeStyles } from '@material-ui/core';

function Loader (props) {
	const classes = useStyles();
	return (
		<div>
			<Backdrop className={classes.backdrop} open={props.open}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</div>
	);
}

const useStyles = makeStyles({
	backdrop : {
		zIndex : 1000,
		color  : '#fff',
	},
});

export default Loader;
