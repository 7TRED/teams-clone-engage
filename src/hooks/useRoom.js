import { useState, useCallback, useEffect, useRef } from 'react';
import { connect as roomConnect } from 'twilio-video';
import MEDIA_CONSTRAINTS from '../constants/MediaConstraints';

export function useRoom () {
	const [ room, setRoom ] = useState(null);
	const [ isConnecting, setIsConnecting ] = useState(false);
	const [ connectLog, setConnectLog ] = useState({});

	const connect = useCallback(async (token, options) => {
		setIsConnecting(true);
		return roomConnect(token, { ...options, ...MEDIA_CONSTRAINTS })
			.then((newRoom) => {
				setRoom(newRoom);
				console.log(newRoom);
				const disconnect = () => newRoom.disconnect();

				if (window.mediaSettings.isAudioMuted) {
					newRoom.localParticipant.audioTracks.forEach((trackPublication) => {
						trackPublication.track.disable();
					});
				}

				if (window.mediaSettings.isVideoMuted) {
					newRoom.localParticipant.videoTracks.forEach((trackPublication) => {
						trackPublication.track.disable();
					});
				}

				newRoom.setMaxListeners(15);

				newRoom.once('disconnected', () => {
					// setTimeout(() => setRoom(null));
					window.removeEventListener('beforeunload', disconnect);
				});

				window.twilioRoom = newRoom;
				newRoom.localParticipant.videoTracks.forEach((track) => track.setPriority('low'));

				window.addEventListener('beforeunload', disconnect);

				setIsConnecting(false);
				return true;
			})
			.catch((error) => {
				console.log(error.name);
				setConnectLog({ severity: 'error', message: CONNECT_ERRORS[error.name] });
				setIsConnecting(false);
				return false;
			});
	}, []);

	return { room, isConnecting, connect, connectLog };
}

const CONNECT_ERRORS = {
	SignalingConnectionError         : 'Please ensure that you have a stable internet connection and try again',
	SignalingServerBusy              : 'Please try to join again after sometime',
	RoomMaxParticipantsExceededError : 'Maximum number of participants reached, please contact the meeting organizer',
	MediaConnectionError             : 'Please ensure that you have a stable internet connection and try again',
	NotAllowedError                  : 'Please provide permission to camera and microphone to join the meeting.After allowing Permission refresh the page.',
	NotFoundError                    : 'Please provide permission to camer and microphone and please make sure there is atleast one input device connected.',
	NotReadableError                 : 'Please close all other applications acquiring the input devices and refresh or restart the browser.',
};
