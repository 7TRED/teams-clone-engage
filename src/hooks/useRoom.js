import { useState, useCallback, useEffect, useRef } from 'react';
import { connect as roomConnect } from 'twilio-video';
import MEDIA_CONSTRAINTS from '../constants/MediaConstraints';

export function useRoom () {
	const [ room, setRoom ] = useState(null);
	const [ isConnecting, setIsConnecting ] = useState(false);

	const connect = useCallback((token, options) => {
		setIsConnecting(true);
		return roomConnect(token, { ...options, ...MEDIA_CONSTRAINTS }).then(
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
	}, []);

	return { room, isConnecting, connect };
}
