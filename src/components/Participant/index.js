import React from 'react';
import ParticipantCard from '../ParticipantCard';
import ParticipantTracks from '../ParticipantTracks';

function Participant (props) {
	return (
		<ParticipantCard participant={props.participant} isLocalParticipant={props.isLocalParticipant} cardWidthAndMargin={props.cardWidthAndMargin}>
			<ParticipantTracks participant={props.participant} isLocalParticipant={props.isLocalParticipant} />
		</ParticipantCard>
	);
}

export default Participant;
