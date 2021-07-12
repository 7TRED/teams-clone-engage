import React, { useState, useEffect, useContext } from 'react';
import { Grid, Typography, makeStyles, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import history from '../history';
import { RoomContext } from '../context/RoomContext';
import { MeetingContext } from '../context/MeetingContext';
import Loader from '../components/Loader';

function InRoomLoadPage (props) {
	const { connect, connectLog } = useContext(RoomContext);
	const { roomState, joinRoom } = useContext(MeetingContext);
	const [isLoading, setIsLoading] = useState(true);
	const classes = useStyles();

	useEffect(() => {
		const connectToRoom = async () => {
			const res = await joinRoom(props.match.params.id);
			console.log(res);
			if (res) {
				const success = await connect(roomState.accessToken, { name: props.match.params.id });
				console.log(success);
				if (success) {
					history.push(`/inroom/${props.match.params.id}`);
				}
				setIsLoading(false);
			}
			else {
				history.replace('/')
			}
		};
		setIsLoading(true);
		connectToRoom();
	}, []);

	console.log(connectLog);
	console.log(roomState.log);

	const onRejoinClick = () => {
		history.replace(`/room/${props.match.params.id}`);
	}

	const onCancelClick = () => {
		history.replace('/')
	}

	return (
		<Grid container item direction="column" justify="center" alignItems="center" className={classes.root}>
			{isLoading && <Loader open />}
			{(!isLoading &&
			Boolean(connectLog)) ? (
				<React.Fragment>
					<Typography className={classes.message} variant="h5">
						{connectLog?.message? connectLog.message:'Please click the rejoin button to join the meeting.'}
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

export default InRoomLoadPage;
