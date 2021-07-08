import React from 'react';
import { Card, makeStyles, Typography, CardContent, CardMedia } from '@material-ui/core';



function Participant ({participant}) {
	const classes = useStyles();
	const [user, setUser] = React.useState(null);

	React.useEffect(() => {
		const getUser = async () => {
			const ref = await participant?.user?.get();
			setUser(ref?.data());
		}
		getUser();
	})
	return (
		<Card elevation={0} className={classes.root}>
			<CardMedia component={'img'} className={classes.pic} src={user?.photoURL} />
			<CardContent>
				<Typography>{user?.displayName}</Typography>
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

export default Participant;
