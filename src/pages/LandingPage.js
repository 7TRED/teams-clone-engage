import React from 'react';
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import videoConferencingImage from '../assets/video_conferencing.jpg';
import { AuthContext } from '../context/AuthContext';
import history from '../history';
import Loader from '../components/Loader';
import googleLogo from '../assets/btn_google_light_normal_ios.svg';

const LandingPage = (props) => {
	const styles = useStyles();
	const { isLoading, login } = React.useContext(AuthContext);

	const handleLogin = async () => {
		await login();
		history.replace(`${props.location.pathname}`);
	};

	if (isLoading) {
		return <Loader open />;
	}

	return (
		<React.Fragment>
			<Grid container direction="row" className={styles.root}>
				<Grid container item direction="row" xs={4} justify="center" alignItems="center" className={styles.subContainer}>
					<Grid container item direction="column" xs={10} spacing={10} justify="center" alignItems="center">
						<Typography variant="h2" color="primary" className={styles.title}>
							Teamspace
						</Typography>
						<Typography variant="h5" color="initial" className={styles.subtitle}>
							Meet, chat, call and collab all at one place.
						</Typography>
						<div className={styles.margin}>
							<Button variant="outlined" color="primary" onClick={handleLogin}>
								<img src={googleLogo} alt="google-logo" /> Sign-in with Google {isLoading ? <Loader open={true} /> : null}
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

const useStyles = makeStyles({
	root         : {
		margin : 0,
		height : '90vh',
		width  : '100%',
	},
	subContainer : {
		height : '100%',
	},
	margin       : {
		marginTop    : '10%',
		marginBottom : '10%',
	},
	title        : {
		fontSize : '5rem',
	},
	subtitle     : {
		fontSize : '2rem',
	},
});
