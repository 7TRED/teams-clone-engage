import React from 'react';

import { Grid, makeStyles, Typography, CircularProgress, Button } from '@material-ui/core';
import videoConferencingImage from '../assets/video_conferencing.jpg';
import { AuthContext } from '../context/AuthContext';
import history from '../history';
import Loader from '../components/Loader';

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

const LandingPage = (props) => {
	const styles = useStyles();
	const { isLoading, login } = React.useContext(AuthContext);

	const handleLogin = async () => {
		await login();
		history.push('/');
	};

	function renderLoader () {
		return (
			<CircularProgress color="secondary" size="small">
				Loading
			</CircularProgress>
		);
	}

	return (
		<React.Fragment>
			<Grid container direction="row" className={styles.root}>
				<Grid container item direction="row" xs={4} justify="center" alignItems="center" className={styles.subContainer}>
					<Grid container item direction="column" xs={10} spacing={10} justify="center" alignContent="center">
						<Typography variant="h2" color="primary">
							Teams
						</Typography>
						<Typography variant="h5" color="initial">
							Meet, chat, call and collab all at one place.
						</Typography>
						<div className={styles.margin}>
							<Button variant="outlined" color="primary" onClick={handleLogin}>
								Sign-in with Google {isLoading ? <Loader open={true} /> : null}
							</Button>
						</div>
					</Grid>
				</Grid>
				<Grid container item xs={8} className={styles.subContainer} justify="center" alignItems="center">
					<img src={videoConferencingImage} alt="Video conferencing with team" width="80%" height="80%" />
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default LandingPage;
