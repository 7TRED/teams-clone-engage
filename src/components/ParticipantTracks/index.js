import React from 'react';
import Publication from '../Publication';
import { usePublications } from '../../hooks';

function ParticipantTracks (props) {
	const publications = usePublications(props.participant);

	return (
		<React.Fragment>
			{publications.map((publication) => {
				return <Publication key={publication.kind} publication={publication} isLocalParticipant={props.isLocalParticipant} />;
			})}
		</React.Fragment>
	);
}

export default ParticipantTracks;
