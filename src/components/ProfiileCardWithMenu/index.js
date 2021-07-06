import React from 'react';
import { Card, makeStyles, CardMedia, CardContent, Typography } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';
function ProfileCardWithMenu () {
	const classes = useStyles();
	const { authState } = React.useContext(AuthContext);
	return (
		<Card className={classes.root}>
			<CardMedia className={classes.cover} component="img" src={`${authState.user.photoURL}`} title="Profile Picture" />
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<Typography className={classes.title} variant="subtitle1" color="primary">
						{authState.user.displayName}
					</Typography>
					<Typography className={classes.subtitle} color="textSecondary" variant="body2">
						{authState.user.email}
					</Typography>
				</CardContent>
			</div>
		</Card>
	);
}

const useStyles = makeStyles((theme) => ({
	root    : {
		display     : 'flex',
		width       : '100%',
		alignItems  : 'center',
		height      : '5em',
		paddingLeft : '0.2em',
		background  : 'transparent',
		boxShadow   : 'none',
	},
	title   : {
		color      : '#4d4dff',
		fontWeight : '500',
		fontSize   : '1.3em',
	},
	details : {
		display        : 'flex',
		flexDirection  : 'column',
		justifyContent : 'center',
		alignItems     : 'center',
	},
	content : {},
	cover   : {
		width        : 60,
		height       : 60,
		borderRadius : 50,
	},
}));

export default ProfileCardWithMenu;
