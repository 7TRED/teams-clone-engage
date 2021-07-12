import { useState, useContext, createContext } from 'react';
import api from '../../services/api';
import history from '../../history';
import { addRoom, addParticipantToRoom, addRoomToParticipant, fetchRoom } from '../../services/Firebase/firebaseDB';
import { AuthContext } from '../AuthContext';
import * as uuid from 'uuid';
/**
 * Meeting Context provides functions to create room using the twilio API.
 * Also, function to generate accessToken which is needed while joining the room.
 */

// Errors

export const LOGS = {
	ROOM_NOT_CREATED : 'Failed to create the room. Please check your network connection.',
	INVALID_TOKEN    : 'Oops!! There seems to be a problem with your network connection',
	TOKEN_GENERATED  : 'token generated successfully',
	ROOM_NOT_FOUND   : 'Plese enter a valid room ID',
	ROOM_CREATED     : 'Yoooo hooo !! Room Created',
	ROOM_JOINED      : 'Yaayyy!! Successfully joined the room.',
};

const DEFAULT_STATE = {
	room        : undefined,
	accessToken : null,
	log         : undefined,
};

export const MeetingContext = createContext(null);

export const MeetingProvider = ({ children }) => {
	//states
	const { authState } = useContext(AuthContext);
	const [ roomState, setRoomState ] = useState(DEFAULT_STATE);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ mediaSettings, setMediaSettings ] = useState({ isAudioMuted: false, isVideoMuted: false });

	//functions
	const createRoom = async (roomTitle, roomDescription) => {
		setIsLoading(true);
		try {
			const roomID = `${uuid.v4()}`;
			await addRoom({ roomTitle, roomDescription, roomID: roomID }, authState.user);
			await addParticipantToRoom(roomID, authState.user);
			await addRoomToParticipant({ roomTitle, roomDescription, roomID: roomID, owner: authState.user }, authState.user.uid);
			setRoomState({
				...roomState,
				room : { roomTitle, roomDescription, roomID, owner: authState.user },
				log  : { severity: 'success', message: LOGS.ROOM_CREATED },
			});
			return true;
		} catch (err) {
			setRoomState({ ...roomState, room: undefined, log: { severity: 'error', message: LOGS.ROOM_NOT_CREATED } });
		} finally {
			setIsLoading(false);
		}
		return false;
	};

	const isValidRoom = async (roomID) => {
		setIsLoading(true);
		try {
			const doc = await fetchRoom(roomID);
			if (doc.exists) {
				return doc;
			}
			return false;
		} catch (err) {
			return false;
		} finally {
			setIsLoading(false);
		}
	};

	const joinRoom = async (roomID) => {
		setIsLoading(true);
		try {
			const res = await isValidRoom(roomID);
			if (res) {
				await addParticipantToRoom(roomID, authState.user);
				await addRoomToParticipant(res.data(), authState.user.uid);
				setRoomState({ ...roomState, room: res.data(), log: { severity: 'success', message: LOGS.ROOM_JOINED } });
			} else {
				setRoomState({ ...roomState, room: undefined, log: { severity: 'error', message: LOGS.ROOM_NOT_FOUND } });
			}
		} catch (err) {
			console.log(err);
			setRoomState({ ...roomState, room: undefined, log: { severity: 'error', message: LOGS.INVALID_TOKEN } });
		} finally {
			setIsLoading(false);
		}
	};

	const getAccessToken = async (roomID) => {
		try {
			const response = await api.get('/token', {
				params : {
					room     : roomID,
					identity : authState.user.uid,
				},
			});

			setRoomState({ ...roomState, accessToken: response.data.token, log: { severity: 'success', message: LOGS.TOKEN_GENERATED } });
			return response.data.token;
		} catch (err) {
			console.log(err);
			setRoomState({ ...roomState, accessToken: null, log: { severity: 'error', message: LOGS.INVALID_TOKEN } });
		}
	};

	const setDefault = () => {
		setIsLoading(true);
		setRoomState(DEFAULT_STATE);
		console.log('setDefault');
		setIsLoading(false);
	};

	const selectMeeting = (room) => {
		setIsLoading(true);
		setRoomState({ ...roomState, room });
		setIsLoading(false);
	};

	return (
		<MeetingContext.Provider
			value={{ roomState, isLoading, createRoom, isValidRoom, getAccessToken, setDefault, joinRoom, selectMeeting, mediaSettings, setMediaSettings }}
		>
			{children}
		</MeetingContext.Provider>
	);
};
