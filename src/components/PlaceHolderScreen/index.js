import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';

function PlaceHolderScreen () {
	const classes = useStyles();
	return (
		<Grid container item direction="column" justify="center" alignItems="center" className={classes.root}>
			PlaceHolderScreen
		</Grid>
	);
}

const useStyles = makeStyles({
	root : {
		flex   : 1,
		height : '100%',
	},
});

export default PlaceHolderScreen;
