import React from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import Message from '../Message';

function ChatMessages () {
	const classes = useStyles();
	const messageEl = React.useRef(null);

	return (
		<Grid container item direction="row" className={classes.root} justify="center" alignItems="center">
			<Paper variant="outlined" className={classes.paper} ref={messageEl}>
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
		width      : '100%',
		height     : '75%',
		overflow   : 'hidden',
		background : 'transparent',
	},
	paper : {
		flex          : 0.9,
		height        : '100%',
		overflowX     : 'hidden',
		overflowY     : 'auto',
		display       : 'flex',
		flexDirection : 'column-reverse',
		padding       : '1em',
		background    : 'transparent',
	},
});

export default ChatMessages;
