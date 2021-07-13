import React from 'react';
import { Card, makeStyles, Typography, CardContent, CardMedia } from '@material-ui/core';


function Participant ({participant, isOwner}) {
	const classes = useStyles();
	return (
		<Card elevation={0} className={classes.root}>
			<CardMedia component={'img'} className={classes.pic} src={participant?.user?.photoURL} />
			<CardContent>
				<Typography>{participant?.user?.displayName}</Typography>
			</CardContent>
		</Card>
	);
}

const useStyles = makeStyles({
	root : {
		display       : 'flex',
		flexDirection : 'row',
		alignItems    : 'center',
		background    : 'transparent',
	},
	pic  : {
		height       : 40,
		width        : 40,
		borderRadius : 40,
	},
});

export default React.memo(Participant);
