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
	const { authState } = React.useContext(AuthContext);
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
			<Grid container item direction="row" xs={12} justify="center" alignItems="center" className={styles.subContainer}>
				<Grid container item direction="row" xs={3} className={styles.meetingList}>
					<Grid container item className={styles.meetingListHeader}>
						<ProfileCardWithMenu />
						<Typography color="textPrimary" variant="h6" style={{ width: '100%', textAlign: 'center' }}>
							Meetings
						</Typography>
					</Grid>
					{React.useMemo(() => <MeetingList meetings={meetings} selectMeeting={setSelectedMeeting} />, [ meetings ])}
					<Grid container item direction="row" className={styles.btnContainer1} justify="space-evenly" alignItems="center">
						<CreateMeetingButton />

						<JoinMeetingButton />
					</Grid>
				</Grid>
				<Grid container item direction="row" xs={9} className={styles.chatContainer}>
					{React.useMemo(() => <MeetingSection meeting={selectedMeeting} />, [ selectedMeeting ])}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Homepage;

const useStyles = makeStyles({
	root              : {
		// position   : 'absolute',
		// top        : 0,
		// left       : 0,
		margin     : 0,
		height     : '93%',
		width      : '100%',
		background : '#222',
	},
	subContainer      : {
		height     : '100%',
		background : '#fdfcfa',
		overflow   : 'hidden',
	},
	margin            : {},
	meetingList       : {
		height           : '100%',
		scrollBehavior   : 'smooth',
		borderRightStyle : 'solid',
		borderRightWidth : '2px',
		borderColor      : '#d7d7d7',
		overflow         : 'hidden',
		width            : '100%',
	},
	meetingListHeader : {
		height       : '15%',
		width        : '100%',
		marginLeft   : '1%',
		marginRight  : '1%',
		borderBottom : '2px solid #ddd',

		// backgroundColor : '#fafcff',
	},
	btnContainer1     : {
		width   : '100%',
		padding : '5%',
	},
	chatContainer     : {
		width       : '100%',
		height      : '100%',
		borderRight : '2px solid #c7c7c7',
	},
});
