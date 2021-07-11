import React from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import Message from '../Message';
import { db } from '../../../services/Firebase';
import { getAllMessages } from '../../../services/Firebase/firebaseDB';

function ChatMessages ({ meeting }) {
	const classes = useStyles();
	const messageEl = React.useRef(null);
	const [ messages, setMessages ] = React.useState([]);

	React.useEffect(
		() => {
			const callback = (snapshot) => {
				let allMessages = [];
				snapshot.forEach((res) => {
					allMessages.push(res.data());
				});
				setMessages(allMessages);
			};
			const listener = getAllMessages(meeting?.room?.roomID, callback);
		},
		[ meeting ],
	);

	console.log('messages', messages);

	return (
		<Grid container item direction="row" className={classes.root} justify="center" alignItems="center">
			<Paper elevation={0} className={classes.paper} ref={messageEl}>
				{messages.map((message, idx) => <Message message={message} key={idx} />)}
			</Paper>
		</Grid>
	);
}

const useStyles = makeStyles({
	root  : {
		width      : '95%',
		height     : '75%',
		overflow   : 'hidden',
		background : 'transparent',
	},
	paper : {
		width: '100%',
		height        : '100%',
		overflowX     : 'hidden',
		overflowY     : 'auto',
		display       : 'flex',
		flexDirection : 'column-reverse',
		padding       : '1em',
		background    : 'transparent',
	},
});

export default React.memo(ChatMessages);
