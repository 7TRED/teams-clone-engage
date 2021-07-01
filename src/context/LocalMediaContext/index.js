import { useState, createContext } from 'react';
import Video from 'twilio-video';
import MEDIA_CONSTRAINTS from '../../constants/MediaConstraints';

export const LocalMediaContext = createContext(null);

export const LocalMediaProvider = ({ children }) => {
	const [ localTracks, setLocalTracks ] = useState([]);
	const [ audioDevice, setAudioDevice ] = useState(null);
	const [ videoDevice, setVideoDevice ] = useState(null);
	const [ isAudioMuted, setisAudioMuted ] = useState(false);
	const [ isVideoMuted, setisVideoMuted ] = useState(false);
	const [ isAcquiringLocalTrack, setIsAcquiringLocalTrack ] = useState(false);

	//to create LocalTracks with MediaConstraints
	const getLocalTracks = async () => {
		try {
			setIsAcquiringLocalTrack(true);
			setLocalTracks(await Video.createLocalTracks(MEDIA_CONSTRAINTS));
		} catch (err) {
			console.log(err);
		} finally {
			setIsAcquiringLocalTrack(false);
		}
	};

	//to stop localTracks
	const removeLocalTracks = () => {
		if (localTracks.length > 0) {
			localTracks.forEach((track) => {
				track.stop();
				setLocalTracks([]);
			});
		}
	};

	//to stop Audio Tracks
	const removeAudioTrack = () => {
		if (localTracks && localTracks[0]) {
			localTracks[0].stop();
			setLocalTracks([ undefined, localTracks[1] ]);
		}
	};

	// to stop Video Track
	const removeVideoTrack = () => {
		if (localTracks && localTracks[1]) {
			localTracks[1].stop();
			setLocalTracks([ localTracks[0], undefined ]);
		}
	};

	// to mute local Audio
	const muteLocalAudio = () => {
		if (localTracks && localTracks[0]) {
			localTracks[0].disable();
			setisAudioMuted(true);
		}
	};

	// to unmute local Audio
	const unmuteLocalAudio = () => {
		if (localTracks && localTracks[0]) {
			localTracks[0].enable();
			setisAudioMuted(false);
		}
	};

	// to turn off local Video
	const turnOffLocalVideo = () => {
		if (localTracks && localTracks[1]) {
			localTracks[1].disable();
			setisVideoMuted(false);
		}
	};

	// to turnon localVideo
	const turnOnLocalVideo = () => {
		if (localTracks && localTracks[1]) {
			localTracks[1].enable();
			setisVideoMuted(true);
		}
	};

	return (
		<LocalMediaContext.Provider
			value={{
				localTracks,
				audioDevice,
				setAudioDevice,
				videoDevice,
				setVideoDevice,
				isAudioMuted,
				isVideoMuted,
				isAcquiringLocalTrack,
				getLocalTracks,
				removeLocalTracks,
				removeAudioTrack,
				removeVideoTrack,
				unmuteLocalAudio,
				muteLocalAudio,
				turnOffLocalVideo,
				turnOnLocalVideo,
			}}
		>
			{children}
		</LocalMediaContext.Provider>
	);
};
