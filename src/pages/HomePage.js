import React from 'react';

import { Grid, makeStyles, Typography } from '@material-ui/core';
import CreateMeetingButton from '../components/CreateMeetingButton';
import JoinMeetingButton from '../components/JoinMeetingButton';
import videoConferencingImage from '../assets/video_conferencing.jpg';
import { MeetingContext } from '../context/MeetingContext';

const useStyles = makeStyles({
	root         : {
		margin : 0,
		height : '90vh',
		flex   : 1,
	},
	subContainer : {
		height : '100%',
	},
	margin       : {
		marginTop    : '1em',
		marginBottom : '1em',
	},
});

const Homepage = () => {
	const styles = useStyles();
	const { setDefault } = React.useContext(MeetingContext);
	return (
		<Grid container direction="row" className={styles.root}>
			<Grid container item direction="row" xs={4} justify="center" alignItems="center" className={styles.subContainer}>
				<Grid container item direction="column" xs={10} spacing={10} justify="center" alignContent="center">
					<Typography variant="h2" color="primary">
						Microsoft Teams
					</Typography>
					<Typography variant="h5" color="initial">
						Meet, chat, call and collab all at one place.
					</Typography>
					<div className={styles.margin}>
						<JoinMeetingButton />
					</div>
					<div className={styles.margin}>
						<CreateMeetingButton />
					</div>
				</Grid>
			</Grid>
			<Grid container item xs={8} className={styles.subContainer} justify="center" alignItems="center">
				<img src={videoConferencingImage} alt="Video conferencing with team" width="80%" height="80%" />
			</Grid>
		</Grid>
	);
};

export default Homepage;
