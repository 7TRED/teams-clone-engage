import React from 'react';
import { AppBar, Typography, makeStyles } from '@material-ui/core';

/*
 * This is a header component which will be visible on top of every page
 */

const Header = () => {
	const classes = useStyles();
	return (
		<AppBar position="relative" className={classes.appbar}>
			<Typography variant="h6" color="inherit" className={classes.title}>
				Teamspace
			</Typography>
		</AppBar>
	);
};

const useStyles = makeStyles({
	title  : {
		marginLeft : '3%',
	},
	appbar : {
		height         : '5%',
		justifyContent : 'center',
	},
});

export default Header;
