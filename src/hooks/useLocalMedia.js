import { useEffect, useState, useCallback } from 'react';
import { createLocalAudioTrack, createLocalVideoTrack, createLocalTracks } from 'twilio-video';

export const useLocalMedia = (mediaConstraints) => {
	const [ localTracks, setLocalTrack ] = useState([]);
	const [ isAcquiringLocalTrack, setIsAcquiringLocalTrack ] = useState(false);

	useEffect(
		() => {
			async function getMedia (mediaConstraints) {
				try {
					setLocalTrack(await createLocalTracks(mediaConstraints));
				} catch (err) {
					console.log(err);
				} finally {
					setIsAcquiringLocalTrack(false);
				}
			}

			if (!localTracks.length) {
				setIsAcquiringLocalTrack(true);
				getMedia(mediaConstraints);
			} else {
				// cleanup function to stop the localTrack when the component unmounts
				return () => {
					localTracks.forEach((track) => {
						track.stop();
					});
				};
			}
		},
		[ localTracks, mediaConstraints ],
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

	// const getLocalVideoTrack = useCallback(() => {
	// 	setIsAcquiringLocalTrack(true);
	// 	const videoOptions = { ...mediaConstraints.video, name: `camera-${Date.now()}` };
	// 	return createLocalVideoTrack(videoOptions).then((videoTrack) => {
	// 		setLocalVideoTrack(videoTrack);
	// 		setIsAcquiringLocalTrack(false);
	// 		return videoTrack;
	// 	});
	// }, []);

	// const getLocalAudioTrack = useCallback(() => {
	// 	setIsAcquiringLocalTrack(true);
	// 	const audioOptions = { ...mediaConstraints.audio };
	// 	return createLocalAudioTrack(audioOptions).then((audioTrack) => {
	// 		setLocalAudioTrack(audioTrack);
	// 		setIsAcquiringLocalTrack(false);
	// 		return audioTrack;
	// 	});
	// }, []);

	// const getAudioAndVideoTracks = useCallback(
	// 	() => {
	// 		setIsAcquiringLocalTrack(true);
	// 		const options = { audio: { ...mediaConstraints.audio }, video: { ...mediaConstraints.video, name: `camera-${Date.now()}` } };

	// 		return createLocalTracks(options)
	// 			.then((localTrack) => {
	// 				const videoTrack = localTrack.find((track) => track.kind === 'video');
	// 				const audioTrack = localTrack.find((track) => track.kind === 'audio');

	// 				if (videoTrack) {
	// 					setLocalVideoTrack(videoTrack);
	// 				}

	// 				if (audioTrack) {
	// 					setLocalAudioTrack(audioTrack);
	// 				}
	// 			})
	// 			.finally(() => setIsAcquiringLocalTrack(false));
	// 	},
	// 	[ localAudioTrack, localVideoTrack, isAcquiringLocalTrack ],
	// );

	// const localTracks = [ localAudioTrack, localVideoTrack ].filter((track) => track !== undefined);

	return {
		localTracks,
		isAcquiringLocalTrack,
		removeLocalVideoTrack,
		removeLocalAudioTrack,
	};
};
