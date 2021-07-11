import React from 'react';
import { Card, makeStyles, Avatar, CardHeader, IconButton, Typography, Menu, MenuItem } from '@material-ui/core';
import history from '../../history';
import { AuthContext } from '../../context/AuthContext';
import { MoreVert } from '@material-ui/icons';

function ProfileCardWithMenu () {
	const classes = useStyles();
	const { authState, logout } = React.useContext(AuthContext);
	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const handleLogout = async () => {
		setAnchorEl(null);
		await logout();
		history.push('/');
	};

	const handleOnClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={<Avatar src={authState.user.photoURL}>{authState.user.displayName.substring(0, 2)}</Avatar>}
				title={
					<Typography variant="subtitle1" className={classes.title}>
						{authState.user.displayName}
					</Typography>
				}
				subheader={authState.user.email}
				action={
					<React.Fragment>
						<IconButton aria-label="settings" onClick={handleOnClick}>
							<MoreVert />
						</IconButton>
						<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
							<MenuItem onClick={handleLogout}>Logout</MenuItem>
						</Menu>
					</React.Fragment>
				}
				className={classes.header}
			/>
		</Card>
	);
}

const useStyles = makeStyles((theme) => ({
	root   : {
		display     : 'flex',
		width       : '100%',
		alignItems  : 'center',
		height      : '100%',
		paddingLeft : '0.2rem',
		background  : 'transparent',
		boxShadow   : 'none',
	},
	title  : {
		color      : '#4d4dff',
		fontWeight : '500',
		fontSize   : '1.3rem',
	},
	header : {
		width : '100%',
	},
}));

export default ProfileCardWithMenu;
