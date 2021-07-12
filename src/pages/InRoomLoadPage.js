import React, { useState, useEffect, useContext } from 'react';
import { Grid, Typography, makeStyles, Button } from '@material-ui/core';
import history from '../history';
import { RoomContext } from '../context/RoomContext';
import { MeetingContext } from '../context/MeetingContext';
import Loader from '../components/Loader';

function InRoomLoadPage (props) {
	const { connect, isConnecting, connectLog } = useContext(RoomContext);
	const { roomState } = useContext(MeetingContext);
	const classes = useStyles();
	useEffect(() => {
		const connectToRoom = async () => {
			const res = await connect(roomState.accessToken, { name: props.match.params.id });
		};
		connectToRoom();
	}, []);
	return (
		<Grid container item direction="column" justify="center" alignItems="center" className={classes.root}>
			{isConnecting && <Loader open />}
			{!isConnecting &&
			Boolean(connectLog) && (
				<React.Fragment>
					<Typography className={classes.message} variant="h5">
						{connectLog.message}
					</Typography>
					<Button variant="contained" color="primary">
						Rejoin
					</Button>
				</React.Fragment>
			)}
		</Grid>
	);
}

const useStyles = makeStyles({
	root : {
		height     : '93%',
		width      : '100%',
		background : '#222',
	},
});

export default InRoomLoadPage;
