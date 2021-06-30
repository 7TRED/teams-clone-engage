import React from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { createRoom } from '../../store/actions';

function CreateMeetingButton (props) {
	const handleOnClick = () => {
		props.createRoom();
	};
	return (
		<Button variant="contained" color="primary" onClick={handleOnClick}>
			Create Meeting
		</Button>
	);
}

export default connect(null, { createRoom })(CreateMeetingButton);
