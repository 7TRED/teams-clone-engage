import React, { useState, useEffect } from 'react';
import { TextField, makeStyles, Button, MenuItem } from '@material-ui/core';

const useStyles = makeStyles({
	form : {
		display        : 'flex',
		flexDirection  : 'column',
		width          : '80%',
		height         : '90%',
		justifyContent : 'space-evenly',
	},
});

function PreJoinForm ({ audioDevices, videoDevices, mediaConfig, setMediaConfig, handleSubmit }) {
	const classes = useStyles();
	const [ selectedDevices, setDevices ] = useState({ audioDevice: { ...audioDevices[0] }, videoDevice: { ...videoDevices[0] } });
	const [ userName, setUserName ] = useState('');

	useEffect(
		() => {
			setMediaConfig({ ...mediaConfig, ...selectedDevices });
		},
		[ selectedDevices ],
	);

	function handleJoin () {
		handleSubmit(userName);
	}

	return (
		<form className={classes.form} noValidate autoComplete="off">
			<TextField id="standard-basic" label="UserName" value={userName} onChange={(e) => setUserName(e.target.value)} />
			<TextField variant="outlined" label="Audio Device" select onChange={(e) => setDevices({ ...selectedDevices, audioDevice: e.target.value })}>
				{audioDevices.map((option) => (
					<MenuItem key={option.deviceID} value={option}>
						{option.label}
					</MenuItem>
				))}
			</TextField>
			<TextField select variant="outlined" label="Video Device" onChange={(e) => setDevices({ ...selectedDevices, videoDevice: e.target.value })}>
				{videoDevices.map((option) => (
					<MenuItem key={option.deviceID} value={option}>
						{option.label}
					</MenuItem>
				))}
			</TextField>
			<Button variant="contained" color="primary" onClick={handleJoin}>
				Join
			</Button>
		</form>
	);
}

export default PreJoinForm;
