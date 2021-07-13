import React, { useContext } from 'react';
import { Grid, Typography, makeStyles, Button } from '@material-ui/core';
import history from '../history';
import { RoomContext } from '../context/RoomContext';
import { MeetingContext } from '../context/MeetingContext';

function OnDisconnectPage (props) {
	const {disconnectLog } = useContext(RoomContext);
	const { roomState,setDefault} = useContext(MeetingContext);
	const classes = useStyles();

	
	console.log(disconnectLog);
	console.log(roomState.log);

	const onRejoinClick = () => {
		history.replace(`/room/${props.match.params.id}`);
	}

	const onCancelClick = () => {
		setDefault();
		history.replace('/')
	}

	return (
		<Grid container item direction="column" justify="center" alignItems="center" className={classes.root}>
			{Boolean(disconnectLog) ? (
				<React.Fragment>
					<Typography className={classes.message} variant="h5">
						{disconnectLog?.message? disconnectLog.message:'Please click the rejoin button to join the meeting.'}
					</Typography>
					<Grid container className={classes.btnContainer} item direction="row" justify="space-evenly" alignItems="center">
						<Button variant="outlined" color="inherit" onClick={onRejoinClick}>
							Rejoin
						</Button>
						<Button variant="outlined" color="inherit" onClick={onCancelClick}>Back to Home</Button>
					</Grid>
				</React.Fragment>
			):null}
		</Grid>
	);
}

const useStyles = makeStyles({
	root : {
		height     : '93%',
		width      : '100%',
		background: '#222',
		color:'white'
	},
	message: {
		color: '#f6f6f6',
		width: '60%',
		textAlign:'center'
	},
	btnContainer: {
		width: '15%',
		margin:'3%'
	}
});

export default OnDisconnectPage;
