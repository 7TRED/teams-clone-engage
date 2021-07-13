import React from 'react';
import { Button} from '@material-ui/core';
import history from '../../history';
import { MeetingContext } from '../../context/MeetingContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';


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
