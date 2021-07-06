import React from 'react';
import { makeStyles } from '@material-ui/core';
import MeetingCard from '../MeetingCard';
import './styles.css';

function MeetingList () {
	const classes = useStyles();
	return (
		<div className={classes.scrollContainer}>
			<MeetingCard />
			<MeetingCard />
			<MeetingCard />
			<MeetingCard />
			<MeetingCard />
			<MeetingCard />
			<MeetingCard />
			<MeetingCard />
			<MeetingCard />
			<MeetingCard />
			<MeetingCard />
			<MeetingCard />
		</div>
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
