import React from 'react';
import { makeStyles } from '@material-ui/core';
import MeetingCard from '../MeetingCard';
import './styles.css';

import { AuthContext } from '../../context/AuthContext';
let rooms = [];
function MeetingList ({ meetings, selectMeeting }) {
	const classes = useStyles();
	const { authState } = React.useContext(AuthContext);

	console.log(meetings);
	console.log(meetings.length);
	return (
		<div className={classes.scrollContainer}>{meetings.map((meeting, idx) => <MeetingCard meeting={meeting} key={idx} onSelect={selectMeeting} />)}</div>
	);
}

const useStyles = makeStyles({
	scrollContainer : {
		height          : '74%',
		width           : '100%',
		overflowX       : 'hidden',
		overflowY       : 'auto',
		paddingLeft     : '0.2em',
		paddingRight    : '0.2em',
		backgroundColor : '#efeff3',
	},
});

export default MeetingList;
