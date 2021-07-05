import React, { useState, useEffect } from 'react';
import { TextField, makeStyles, Button, MenuItem } from '@material-ui/core';
import { useAudioDevices, useVideoDevices } from '../../hooks';

const useStyles = makeStyles({
	form : {
		display        : 'flex',
		flexDirection  : 'column',
		width          : '100%',
		height         : '100%',
		justifyContent : 'space-evenly',
		padding        : '2em',
		borderRadius   : 10,
	},
});

function PreJoinForm ({ setMediaConfig, handleSubmit }) {
	const classes = useStyles();
	const audioDevices = useAudioDevices();
	const videoDevices = useVideoDevices();
	const [ userName, setUserName ] = useState('');

	function handleJoin () {
		handleSubmit(userName);
	}

	return (
		<form className={classes.form} noValidate autoComplete="off">
			<TextField id="standard-basic" label="UserName" value={userName} onChange={(e) => setUserName(e.target.value)} />
			<TextField variant="outlined" label="Audio Device" select onChange={(e) => setMediaConfig((prevConfig) => ({ ...prevConfig, audioDevice: e.target.value }))}>
				{audioDevices.map((option) => (
					<MenuItem key={option.deviceID} value={option.deviceID}>
						{option.label}
					</MenuItem>
				))}
			</TextField>
			<TextField select variant="outlined" label="Video Device" onChange={(e) => setMediaConfig((prevConfig) => ({ ...prevConfig, videoDevice: e.target.value }))}>
				{videoDevices.map((option) => (
					<MenuItem key={option.deviceID} value={option.deviceID}>
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
