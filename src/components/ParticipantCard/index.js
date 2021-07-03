import React from 'react';
import { Avatar, Typography, makeStyles, Grow } from '@material-ui/core';

import { useIsTrackSwitchedOff, usePublications, useTracks } from '../../hooks';
import ParticipantTracks from '../ParticipantTracks';

import './styles.css';

function ParticipantCard (props) {
	const publications = usePublications(props.participant);
	const { cardWidthAndMargin: dimensions } = props;

	const audioPublication = publications.find((p) => p.kind === 'audio');
	const videoPublication = publications.find((p) => p.kind === 'video');

	const isVideoEnabled = Boolean(videoPublication);
	const videoTrack = useTracks(videoPublication);
	const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);

	const audioTrack = useTracks(audioPublication);

	console.log(audioTrack, videoTrack);
	console.log(publications);

	const classes = useStyles();

	return (
		<div
			className="video-card"
			style={{
				width  : `${dimensions.width - dimensions.margin * 2}px`,
				height : `${dimensions.width * (9 / 16) - dimensions.margin * 2}px`,
				margin : `${dimensions.margin}px`,
			}}
		>
			{props.children}
			<Avatar
				className={classes.avatar}
				style={{
					display         : `${!isVideoEnabled || !isVideoSwitchedOff ? '' : 'none'}`,
					backgroundColor : '#666611',
					width           : '15%',
					height          : '25%',
				}}
			>
				{props.participant?.identity}
			</Avatar>
		</div>
	);
}

const useStyles = makeStyles({
	card   : {
		position      : 'relative',
		verticalAlign : 'middle',
		alignSelf     : 'center',
		borderRadius  : '10px',
		overflow      : 'hidden',
		display       : 'flex',
		boxShadow     : '0px, 12px, 22px, rgba(0,0,0,0.4)',
		background    : '#222',
	},

	avatar : {
		backgroundColor : '#666611',
		width           : '15%',
		height          : '15%',
	},
});

export default ParticipantCard;
