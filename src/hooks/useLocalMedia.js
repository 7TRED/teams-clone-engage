import { useEffect, useState } from 'react';
import { createLocalTracks } from 'twilio-video';

export const useLocalMedia = (mediaConstraints) => {
	const [ localTrack, setLocalTrack ] = useState([]);

	useEffect(
		() => {
			async function getMedia (mediaConstraints) {
				try {
					setLocalTrack(await createLocalTracks(mediaConstraints));
				} catch (err) {
					console.log(err);
				}
			}

			if (!localTrack.length) {
				getMedia(mediaConstraints);
			} else {
				// cleanup function to stop the localTrack when the component unmounts
				return () => {
					localTrack.forEach((track) => {
						track.stop();
					});
				};
			}
		},
		[ localTrack, mediaConstraints ],
	);

	return localTrack;
};
