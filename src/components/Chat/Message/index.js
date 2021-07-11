import React from 'react';
import { Grid, makeStyles, Typography, Avatar } from '@material-ui/core';
import moment from 'moment';

function Message ({ message }) {
	const classes = useStyles();

	return (
		<Grid container item direction="row" className={classes.rootKaRoot} alignItems="center">
			<Grid container xs={1} direction="row" justify="center"alignItems="center" className={classes.avatar}><Avatar src={message?.sentBy.photoURL} /></Grid>
			<Grid container xs={10} item direction="column" className={classes.root} justify="space-evenly">
				<Grid container item className={classes.messageHeader}>
					<Typography className={classes.username}>{message?.sentBy.displayName}</Typography>
					<Typography className={classes.timestamp} color={'textSecondary'}>
						{moment(message?.sentAt).format('LT')}
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
		background   : '#fff',
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
	avatar: {
		height: '100%'
	},
	rootKaRoot: {
		width:'90%'
	}
});

export default Message;
