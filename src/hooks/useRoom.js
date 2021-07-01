import { useState, useCallback, useEffect, useRef } from 'react';
import { connect as roomConnect } from 'twilio-video';

export function useRoom (localTracks, options) {
	const [ room, setRoom ] = useState(null);
	const [ isConnecting, setIsConnecting ] = useState(false);
	const optionsRef = useRef(null);

	useEffect(
		() => {
			optionsRef.current = options;
		},
		[ options ],
	);

	const connect = useCallback(
		(token) => {
			setIsConnecting(true);
			return roomConnect(token, { ...optionsRef.current, tracks: localTracks }).then(
				(newRoom) => {
					setRoom(newRoom);
					console.log(newRoom);
					const disconnect = () => newRoom.disconnect();

					newRoom.setMaxListeners(15);

					newRoom.once('disconnected', () => {
						setTimeout(() => setRoom(null));
						window.removeEventListener('beforeunload', disconnect);
					});

					window.twilioRoom = newRoom;
					newRoom.localParticipant.videoTracks.forEach((track) => track.setPriority('low'));

					window.addEventListener('beforeunload', disconnect);

					setIsConnecting(false);
				},
				(error) => {
					console.log(error);
					setIsConnecting(false);
				},
			);
		},
		[ localTracks ],
	);

	return { room, isConnecting, connect };
}
