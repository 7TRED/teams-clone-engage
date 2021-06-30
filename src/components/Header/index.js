import React from 'react';
import { AppBar, Typography, makeStyles, Toolbar } from '@material-ui/core';

const Header = () => {
	return (
		<AppBar position={'fixed'}>
			<Toolbar variant="dense">
				<Typography variant="h6" color="inherit">
					Microsoft Teams
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
