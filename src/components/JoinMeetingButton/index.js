import React from 'react';
import { Button} from '@material-ui/core';
import history from '../../history';
import { MeetingContext } from '../../context/MeetingContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';


function JoinMeetingButton ({ meeting }) {
	const { isValidRoom } = React.useContext(MeetingContext);

	const handleOnClick = async () => {
		// const res = await isValidRoom(meeting?.room.roomID);
		// if (res) {
		// 	history.push(`/room/${meeting?.roomID}`);
		// } else {
		// 	return;
		// }
		history.push(`/room/${meeting?.room.roomID}`);
	};

	return (
		<React.Fragment>
			<div
				style={{
					display : 'flex',
				}}
			>
				<Button variant="contained" color="primary" onClick={handleOnClick}>
					Join
				</Button>
				<CopyToClipboard text={meeting?.room.roomID}>
					<Button color="primary" variant="text">
						Invite
					</Button>
				</CopyToClipboard>
			</div>
		</React.Fragment>
	);
}

export default JoinMeetingButton;
