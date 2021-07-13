import { useEffect, useState } from 'react';
import { createLocalTracks } from 'twilio-video';
import MEDIA_CONSTRAINTS from '../constants/MediaConstraints';
import { LocalAudioTrack, LocalVideoTrack } from 'twilio-video';

/**
 * Returns the Local Participants LocalTracks and a log.
 * @returns {[localTracks:[LocalAudioTrack, LocalVideoTrack],isAcquiringLocalTrack:boolean, localTrackLog:{severity:string, message:string}]}
 */

export const useLocalMedia = () => {
	const [ localTracks, setLocalTrack ] = useState([]);
	const [ isAcquiringLocalTrack, setIsAcquiringLocalTrack ] = useState(false);
	const [ localTrackLog, setLocalTrackLog ] = useState({});

	useEffect(
		() => {
			async function getMedia () {
				try {
					setLocalTrack(await createLocalTracks(MEDIA_CONSTRAINTS));
					setLocalTrackLog({ severity: 'success', message: 'Looks like you are all ready to join!!' });
				} catch (err) {
					setLocalTrackLog({ severity: 'error', message: MEDIA_ERRORS[err.name] });
				} finally {
					setIsAcquiringLocalTrack(false);
				}
			}

			if (!localTracks.length) {
				setIsAcquiringLocalTrack(true);
				getMedia();
			}
			// cleanup function to stop the localTrack when the component unmounts
			return () => {
				if (localTracks.length > 0) {
					localTracks.forEach((track) => {
						track.stop();
					});
				}
			};
		},
		[ localTracks ],
	);

	return {
		localTracks,
		isAcquiringLocalTrack,
		localTrackLog,
	};
};

const MEDIA_ERRORS = {
	NotAllowedError  : 'Please provide permission to camera and microphone to join the meeting.After allowing Permission refresh the page.',
	NotFoundError    : 'Please provide permission to camer and microphone and please make sure there is atleast one input device connected.',
	NotReadableError : 'Please close all other applications acquiring the input devices and refresh or restart the browser.',
};
