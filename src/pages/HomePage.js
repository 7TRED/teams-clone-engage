import React, { useState } from 'react';
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import { AuthContext } from '../context/AuthContext';
import CreateMeetingButton from '../components/CreateMeetingButton';
import JoinMeetingButton from '../components/JoinMeetingButtonForm';
import ProfileCardWithMenu from '../components/ProfiileCardWithMenu';
import MeetingList from '../components/MeetingList';
import MeetingSection from '../components/MeetingSection';
import { getAllParticipantRooms } from '../services/Firebase/firebaseDB';

const Homepage = (props) => {
	const styles = useStyles();
	const { authState, logout } = React.useContext(AuthContext);
	const [ meetings, setMeetings ] = React.useState([]);

	React.useEffect(() => {
		const callback = (snapshot) => {
			let rooms = [];
			snapshot.forEach((res) => {
				const data = res.data();
				rooms.push(data);
			});
			setMeetings(rooms);
		};
		console.log('meetings', meetings);
		getAllParticipantRooms(authState.user.uid, callback);
	}, []);

	const [ selectedMeeting, setSelectedMeeting ] = useState(undefined);

	return (
		<Grid container direction="row" className={styles.root} justify="center" alignItems="center">
			<Grid container item direction="row" xs={11} justify="center" alignItems="center" className={styles.subContainer}>
				<Grid container item direction="row" xs={3} className={styles.meetingList}>
					<Grid container item direction="column" xs={12} className={styles.meetingListHeader} alignItems="center" justify="center">
						<ProfileCardWithMenu />
						<Typography color="textPrimary" variant="h6">
							Meetings
						</Typography>
						<Button color="primary" variant="outlined" onClick={logout}>
							Logout
						</Button>
					</Grid>
					{React.useMemo(() => <MeetingList meetings={meetings} selectMeeting={setSelectedMeeting} />, [ meetings ])}
					<Grid container item direction="row" className={styles.btnContainer1} justify="space-evenly" alignItems="center">
						<div className={styles.margin}>
							<CreateMeetingButton />
						</div>
						<div className={styles.margin}>
							<JoinMeetingButton />
						</div>
					</Grid>
				</Grid>
				<Grid container item direction="row" xs={9} className={styles.chatContainer}>
					{React.useMemo(() => <MeetingSection meeting={selectedMeeting} />, [ meetings, selectedMeeting ])}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Homepage;

const useStyles = makeStyles({
	root              : {
		position   : 'absolute',
		top        : 0,
		left       : 0,
		margin     : 0,
		height     : '100vh',
		flex       : 1,
		background : '#222',
		paddingTop : '2%',
	},
	subContainer      : {
		height       : '93%',
		background   : '#fdfcfa',
		borderRadius : '1rem',
		overflow     : 'hidden',
	},
	margin            : {},
	meetingList       : {
		height           : '100%',
		scrollBehavior   : 'smooth',
		borderRightStyle : 'solid',
		borderRightWidth : '2px',
		borderColor      : '#d7d7d7',
		overflow         : 'hidden',
	},
	meetingListHeader : {
		height       : '15%',
		width        : '100%',
		marginLeft   : '1em',
		marginRight  : '1em',
		borderBottom : '2px solid #ddd',

		// backgroundColor : '#fafcff',
	},
	btnContainer1     : {
		width   : '100%',
		padding : '0.5em',
	},
	chatContainer     : {
		flex        : 1,
		height      : '100%',
		borderRight : '2px solid #c7c7c7',
	},
});
