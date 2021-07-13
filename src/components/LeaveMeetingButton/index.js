import React from 'react';
import { Button} from '@material-ui/core';
import { MeetingContext } from '../../context/MeetingContext';
import Loader from '../Loader';
import LogMessage from '../SnackBar';


function LeaveMeetingButton({ meeting }) {
    const { leaveRoom, roomState, isLoading, setDefault } = React.useContext(MeetingContext);
    const [isLogOpen, setIsLogOpen] = React.useState(false);

    const onLogClose = () => {
        setIsLogOpen(false);
    }

    const handleOnClick = async () => {
        const res = await leaveRoom(meeting?.room?.roomID);
        if (res) {
            window.location.reload(false);
        } else {
            setIsLogOpen(true);
        }
    };
    
    if (isLoading) {
        return <Loader open/>
    }

	return (
		<React.Fragment>
				<Button variant="contained" color="primary" onClick={handleOnClick} style={{margin:'10px'}}>
					Leave Meeting
            </Button>
            <LogMessage open={isLogOpen} severity={roomState.log?.severity} message={roomState.log?.message} onClose={onLogClose} duration={5000}/>
		</React.Fragment>
	);
}

export default LeaveMeetingButton;
