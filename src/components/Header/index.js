import React from 'react';
import { AppBar, Typography, makeStyles, Toolbar } from '@material-ui/core';

/*
 * This is a header component which will be visible on top of every page
 */

const Header = () => {
	const classes = useStyles();
	return (
		<AppBar position="">
			<Toolbar>
				<Typography variant="h6" color="inherit" className={classes.title}>
					Teamspace
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

const useStyles = makeStyles({
	title : {
		flexGrow : 1,
	},
});

export default Header;
