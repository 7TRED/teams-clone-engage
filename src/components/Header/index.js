import React from 'react';
import { AppBar, Typography, makeStyles, Toolbar } from '@material-ui/core';
import ProfileCard from '../ProfileCard';
import { AuthContext } from '../../context/AuthContext';

const Header = () => {
	const { authState } = React.useContext(AuthContext);
	const classes = useStyles();
	return (
		<AppBar position="">
			<Toolbar>
				<Typography variant="h6" color="inherit" className={classes.title}>
					Microsoft Teams
				</Typography>
				{/* {authState.authToken && <ProfileCard />} */}
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
