import { useState, useCallback } from 'react';
import { connect as roomConnect } from 'twilio-video';
import MEDIA_CONSTRAINTS from '../constants/MediaConstraints';

/** 
 * Handles the connection of a user with a room.This hook stores the current joined room
 * and also returns a connect function which expects users accessToken and configuration
 * options.
 * Returns an array of current room, connection status, connect function and connect log
 * @returns {[room, isConnecting:boolean, connect:((token:string, options:{*})=>Promise<boolean>), connectLog:{severity:string, message:string}]}
 */

export function useRoom () {
	const [ room, setRoom ] = useState(null);
	const [ isConnecting, setIsConnecting ] = useState(false);
	const [ connectLog, setConnectLog ] = useState({});

	const connect = useCallback(async (token, options) => {
		setIsConnecting(true);
		return roomConnect(token, { ...options, ...MEDIA_CONSTRAINTS })
			.then((newRoom) => {
				setRoom(newRoom);
				const disconnect = () => newRoom.disconnect();

				//if user joined with audio muted, disable the audioTrack
				if (window.mediaSettings.isAudioMuted) {
					newRoom.localParticipant.audioTracks.forEach((trackPublication) => {
						trackPublication.track.disable();
					});
				}
				// if user joined with video muted disable the videoTrack
				if (window.mediaSettings.isVideoMuted) {
					newRoom.localParticipant.videoTracks.forEach((trackPublication) => {
						trackPublication.track.disable();
					});
				}

				newRoom.setMaxListeners(15);

				newRoom.once('disconnected', () => {
					window.removeEventListener('beforeunload', disconnect);
				});

				window.twilioRoom = newRoom;
				newRoom.localParticipant.videoTracks.forEach((track) => track.setPriority('low'));

				// if user refreshes while in meeting, user should disconnect from the meeting
				window.addEventListener('beforeunload', disconnect);

				setIsConnecting(false);
				return true;
			})
			.catch((error) => {
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
