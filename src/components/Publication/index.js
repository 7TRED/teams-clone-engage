import React from 'react';
import { useTracks } from '../../hooks';
import VideoTrack from '../VideoTrack';
import AudioTrack from '../AudioTrack';

function Publication ({ publication, isLocalParticipant }) {
	const track = useTracks(publication);
	if (!track) return null;

	switch (track.kind) {
		case 'video':
			return <VideoTrack track={track} isLocalParticipant={isLocalParticipant} />;
		case 'audio':
			return <AudioTrack track={track} />;
		default:
			return null;
	}
}

export default Publication;
