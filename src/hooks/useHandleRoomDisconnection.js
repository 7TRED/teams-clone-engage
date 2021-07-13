import { useEffect, useContext, useState } from 'react';
import history from '../history';
import { MeetingContext } from '../context/MeetingContext';

export function useHandleRoomDisconnection (room) {
	const [ disconnectLog, setDisconnectLog ] = useState(undefined);
	useEffect(
		() => {
			if (room) {
				console.log('eoo', room);
				const onDisconnected = (_, error) => {
					if (error) {
						setDisconnectLog({ severity: 'error', message: DISCONNECT_ERRORS[error.name] });
					} else {
						setDisconnectLog({ severity: 'success', message: DISCONNECT_ERRORS.SuccessfullDisconnect });
					}
					history.replace(`/outroom/${room.name}`);
				};

				room.on('disconnected', onDisconnected);

				return function cleanUp () {
					room.off('disconnected', onDisconnected);
				};
			}
		},
		[ room ],
	);

	return [ disconnectLog ];
}

const DISCONNECT_ERRORS = {
	SignalingConnectionDisconnectedError : 'You have been disconnected from the room due to unstable internet connection',
	SignalingConnectionTimeoutError      : 'Session timed out.Please rejoin the room',
	ParticipantDuplicateIdentityError    : 'Seems like you are trying to join the meeting from a different device or browser.',
	MediaConnectionError                 : 'You have been disconnected from the room due to unstable internet connection',
	NotAllowedError                      :
		'You have been disconnected from the room. Please provide permissions to access your camera and microphone before rejoining the room',
	SuccessfullDisconnect                : 'You have left the meeting.',
};
