import React from 'react';

function AudioTrack ({ track }) {
	const audioRef = React.useRef(null);

	React.useEffect(
		() => {
			if (track) {
				audioRef.current = track.attach();
				document.body.appendChild(audioRef.current);
				return () => track.detach().forEach((el) => el.remove());
			}
		},
		[ track ],
	);
	return null;
}

export default AudioTrack;
