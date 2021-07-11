import React from 'react';
import {makeStyles, Grid } from '@material-ui/core';

import { useIsTrackEnabled, usePublications, useTracks } from '../../hooks';
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

	const audioTrack = useTracks(audioPublication);
	const isAudioEnabled = useIsTrackEnabled(audioTrack);

	React.useEffect(() => {
		const getUser = async () => {
			const doc = await fetchUser(props.participant?.identity);
			if (doc.exists) {
				setUser(doc.data());
			}
		}

		getUser();
	},[props.participant])

	
	

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



export default ParticipantCard;
