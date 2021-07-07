import React from 'react';
import { Grid, makeStyles, TextField, Button } from '@material-ui/core';
import { Send } from '@material-ui/icons';

function ChatInputBox () {
	const classes = useStyles();
	return (
		<Grid container item direction="row" className={classes.root} justify="center" alignItems="center">
			<Grid container item xs={11} className={classes.inputBox}>
				<TextField multiline fullWidth placeholder="Type a Message" />
			</Grid>
			<Grid container item xs={1}>
				<Button variant="contained" color="primary">
					<Send />
				</Button>
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles({
	root     : {
		width        : '88%',
		alignSelf    : 'center',
		border       : '1px solid #ccc',
		borderRadius : 8,
		height       : '8%',
		padding      : '0.5em',
	},
	inputBox : {
		padding : '0.3em',
	},
	input    : {
		flex : 1,
	},
});

export default ChatInputBox;
