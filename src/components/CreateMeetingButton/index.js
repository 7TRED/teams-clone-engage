import React from 'react';
import { Button } from '@material-ui/core';
import ReactLoading from 'react-loading';
import history from '../../history';
import { MeetingContext, Errors } from '../../context/MeetingContext';

function CreateMeetingButton (props) {
	const { roomState, isLoading, createRoom } = React.useContext(MeetingContext);

	const handleOnClick = async () => {
		await createRoom();
		if (roomState.error) {
			return;
		} else {
			history.push(`/room/${roomState.roomDetails.uniqueName}`);
		}
	};

	function renderLoader () {
		return isLoading ? (
			<div>
				<ReactLoading type={'spinningBubbles'} color="black" />
				<div>Loading</div>
			</div>
		) : null;
	}

	return (
		<React.Fragment>
			{renderLoader()}
			<Button variant="contained" color="primary" onClick={handleOnClick}>
				Create Meeting
			</Button>
		</React.Fragment>
	);
}

export default CreateMeetingButton;
