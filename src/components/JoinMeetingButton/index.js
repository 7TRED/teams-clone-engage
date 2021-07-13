import React from 'react';
import { Button} from '@material-ui/core';
import history from '../../history';

/**
 * This Button takes to the PreJoin Page
 */

function JoinMeetingButton ({ meeting }) {
	const handleOnClick = async () => {		
		history.push(`/room/${meeting?.room.roomID}`);
	};
	return (
		<React.Fragment>
				<Button variant="contained" color="primary" onClick={handleOnClick} style={{margin:'10px'}}>
					Join
				</Button>
		</React.Fragment>
	);
}

export default JoinMeetingButton;
