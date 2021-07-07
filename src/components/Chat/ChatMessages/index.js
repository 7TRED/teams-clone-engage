import React from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import Message from '../Message';

function ChatMessages () {
	const classes = useStyles();
	return (
		<Grid container item direction="row" className={classes.root} justify="center" alignItems="center">
			<Paper elevation={1} className={classes.paper}>
				<Message />
				<Message />
				<Message />
				<Message />
				<Message />
				<Message />
				<Message />
				<Message />
				<Message />
				<Message />
				<Message />
				<Message />
				<Message />
				<Message />
			</Paper>
		</Grid>
	);
}

const useStyles = makeStyles({
	root  : {
		width    : '100%',
		height   : '80%',
		overflow : 'hidden',
		padding  : '1em',
	},
	paper : {
		flex          : 0.9,
		height        : '95%',
		overflowX     : 'hidden',
		overflowY     : 'auto',
		display       : 'flex',
		flexDirection : 'column-reverse',
		padding       : '1em',
	},
});

export default ChatMessages;
