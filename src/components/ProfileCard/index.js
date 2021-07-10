import React from 'react';
import { Card, makeStyles, CardMedia, CardContent, Typography, Avatar } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';
function ProfileCard () {
	const classes = useStyles();
	const { authState } = React.useContext(AuthContext);
	return (
		<Card className={classes.root}>
			<Avatar src={`${authState.user.photoURL}`} />
			<div className={classes.details}>
				<CardContent className={classes.content}>
					<Typography className={classes.title} variant="subtitle1">
						{authState.user.displayName}
					</Typography>
					<Typography className={classes.subtitle} color="textSecondary" variant="subtitle2">
						{authState.user.email}
					</Typography>
				</CardContent>
			</div>
		</Card>
	);
}

const useStyles = makeStyles((theme) => ({
	root     : {
		display        : 'flex',
		justifyContent : 'center',
		alignItems     : 'center',
		height         : '3.5rem',
		paddingLeft    : '0.2rem',
		background     : 'transparent',
		boxShadow      : 'none',
	},
	title    : {
		color : '#f7f7f7',
	},
	subtitle : {
		color : '#e7e7e7',
	},
	details  : {
		display        : 'flex',
		flexDirection  : 'column',
		justifyContent : 'center',
		alignItems     : 'center',
	},
	content  : {},
	cover    : {
		width        : '50%',
		height       : '50%',
		borderRadius : '50%',
	},
	controls : {
		display       : 'flex',
		alignItems    : 'center',
		paddingLeft   : theme.spacing(1),
		paddingBottom : theme.spacing(1),
	},
	playIcon : {
		height : 38,
		width  : 38,
	},
}));

export default ProfileCard;
