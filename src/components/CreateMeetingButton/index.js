import React from 'react';
import { Button } from '@material-ui/core';
import ReactLoading from 'react-loading';
import history from '../../history';
import { MeetingContext, Errors } from '../../context/MeetingContext';

function CreateMeetingButton (props) {
	const {isLoading, createRoom } = React.useContext(MeetingContext);

	const handleOnClick = () => {
		createRoom().then((roomDetails) => {
			if (roomDetails) {
				console.log(roomDetails)
				history.push(`/room/${roomDetails?.uniqueName}`);
			}
		});	
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
