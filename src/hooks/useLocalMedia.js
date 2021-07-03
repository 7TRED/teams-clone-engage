import { useEffect, useState, useCallback } from 'react';
import { createLocalAudioTrack, createLocalVideoTrack, createLocalTracks } from 'twilio-video';
import MEDIA_CONSTRAINTS from '../constants/MediaConstraints';

export const useLocalMedia = (wantLocalTrack) => {
	const [ localTracks, setLocalTrack ] = useState([]);
	const [ isAcquiringLocalTrack, setIsAcquiringLocalTrack ] = useState(false);

	useEffect(
		() => {
			async function getMedia () {
				try {
					setLocalTrack(await createLocalTracks(MEDIA_CONSTRAINTS));
				} catch (err) {
					console.log(err);
				} finally {
					setIsAcquiringLocalTrack(false);
				}
			}

			if (!localTracks.length && wantLocalTrack) {
				setIsAcquiringLocalTrack(true);
				getMedia();
			} else {
				// cleanup function to stop the localTrack when the component unmounts
				return () => {
					if (localTracks.length > 0) {
						localTracks.forEach((track) => {
							track.stop();
						});
					}
				};
			}
		},
		[ localTracks, wantLocalTrack ],
	);

	const removeLocalAudioTrack = useCallback(
		() => {
			if (localTracks[0]) {
				localTracks[0].stop();
				setLocalTrack([ undefined, localTracks[1] ]);
			}
		},
		[ localTracks ],
	);

	const removeLocalVideoTrack = useCallback(
		() => {
			if (localTracks[1]) {
				localTracks[1].stop();
				setLocalTrack([ localTracks[0], undefined ]);
			}
		},
		[ localTracks ],
	);

	return {
		localTracks,
		isAcquiringLocalTrack,
		removeLocalVideoTrack,
		removeLocalAudioTrack,
	};
};
