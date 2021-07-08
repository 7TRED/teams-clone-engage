import React from 'react';
import { Grid, makeStyles, Typography, Avatar } from '@material-ui/core';
import { AuthContext } from '../../../context/AuthContext';

function Message ({ message }) {
	const classes = useStyles();
	const [ user, setUser ] = React.useState(undefined);

	React.useEffect(
		() => {
			const getUser = async () => {
				const ref = await message.sentBy.get();
				setUser(ref.data());
			};
			getUser();
		},
		[ message ],
	);
	return (
		<Grid container item direction="row" className={classes.rootKaRoot} alignItems="center">
			<Avatar src={user?.photoURL} />
			<Grid container xs={11} item direction="column" className={classes.root} justify="space-evenly">
				<Grid container item className={classes.messageHeader}>
					<Typography className={classes.username}>{user?.displayName}</Typography>
					<Typography className={classes.timestamp} color={'textSecondary'}>
						{message?.sentAt.toString()}
					</Typography>
				</Grid>
				<Grid container item className={classes.message} direction="column">
					<Grid container item className={classes.messageContent}>
						<Typography variant="body2" className={classes.messageContent} paragraph color={'textPrimary'}>
							{message?.content}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles({
	root           : {
		background   : '#f4f4f4',
		padding      : '0.7em',
		borderRadius : 5,
		margin       : '0.2em',
	},
	message        : {
		width     : '100%',
		marginTop : '0.6em',
	},
	messageHeader  : {
		padding      : '0.1em',
		flex         : 0.4,
		borderBottom : '1px solid #ccc',
	},
	username       : {
		fontSize    : '0.75rem',
		fontWeight  : 'bold',
		marginRight : '1em',
	},
	timestamp      : {
		fontSize : '0.75rem',
	},
	messageContent : {
		width    : '95%',
		wordWrap : 'break-word',
	},
});

export default Message;
