import React from 'react';
import { Avatar, Typography, makeStyles, Grow, Grid } from '@material-ui/core';

import { useIsTrackEnabled, useIsTrackSwitchedOff, usePublications, useTracks } from '../../hooks';
import { fetchUser } from '../../services/Firebase/firebaseDB';
import Video from '../Video';
import AudioTrack from '../AudioTrack';
import VideoCloseCard from '../VideoCloseCard';

import './styles.css';

function ParticipantCard (props) {
	const publications = usePublications(props.participant);
	const [user, setUser] = React.useState(undefined);
	const { cardWidthAndMargin: dimensions } = props;
	const filteredPublications = React.useMemo(()=>publications.filter(p => p !== undefined),[publications]);
	const audioPublication = React.useMemo(()=>filteredPublications.find((p) => p.kind === 'audio'),[filteredPublications]);
	const videoPublication = React.useMemo(()=>filteredPublications.find((p) => p.kind === 'video'),[filteredPublications]);
	const videoTrack = useTracks(videoPublication);
	const isVideoEnabled = useIsTrackEnabled(videoTrack);
	// const isVideoSwitchedOff = useIsTrackSwitchedOff(videoTrack);

	React.useEffect(() => {
		const getUser = async () => {
			const doc = await fetchUser(props.participant?.identity);
			if (doc.exists) {
				setUser(doc.data());
			}
		}

		getUser();
	},[props.participant])

	
	const audioTrack = useTracks(audioPublication);
	const isAudioEnabled = useIsTrackEnabled(audioTrack);

	const classes = useStyles();
	console.log("dimension: ", dimensions);
	return (
		<Grid container item direction="row" justify="center" alignItems="center"
			className={'video-card'}
			style={{
				width  : `${dimensions.width - dimensions.margin * 2}px`,
				height : `${dimensions.width * (9 / 16) - dimensions.margin * 2}px`,
				margin : `${dimensions.margin}px`,
			}}
		>
			{isVideoEnabled ? <Video track={videoTrack} /> : <VideoCloseCard src={user?.photoURL} isAudioMuted={!isAudioEnabled} displayName={user?.displayName} size={'8rem'}/>}

			{isAudioEnabled ? <AudioTrack track={audioTrack}/>:null}
			
		</Grid>
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
		width           : '14%',
		height: '25%',
		justifySelf:'center'
	},
});

export default ParticipantCard;
