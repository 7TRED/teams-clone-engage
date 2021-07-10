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

export const Errors = {
	ROOM_NOT_CREATED : 1,
	INVALID_TOKEN    : 2,
	ROOM_COMPLETED   : 3,
	ROOM_NOT_FOUND   : 4,
};

const DEFAULT_STATE = {
	room        : undefined,
	accessToken : null,
	error       : undefined,
};

export const MeetingContext = createContext(null);

export const MeetingProvider = ({ children }) => {
	//states
	const { authState } = useContext(AuthContext);
	const [ roomState, setRoomState ] = useState(DEFAULT_STATE);
	const [ isLoading, setIsLoading ] = useState(false);

	//functions
	const createRoom = async (roomTitle, roomDescription) => {
		setIsLoading(true);
		try {
			const roomID = `${uuid.v4()}`;
			await addRoom({ roomTitle, roomDescription, roomID: roomID }, authState.user);
			await addParticipantToRoom(roomID, authState.user);
			await addRoomToParticipant({ roomTitle, roomDescription, roomID: roomID, owner: authState.user }, authState.user.uid);
			setRoomState({ ...roomState, room: { roomTitle, roomDescription, roomID, owner: authState.user }, error: undefined });
			return roomID;
		} catch (err) {
			console.log(err);
			setRoomState({ ...roomState, room: undefined, error: { type: Errors.ROOM_NOT_CREATED } });
		} finally {
			setIsLoading(false);
		}
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
				setRoomState({ ...roomState, room: res.data(), error: undefined });
			} else {
				setRoomState({ ...roomState, room: undefined, error: { type: Errors.ROOM_NOT_CREATED } });
			}
		} catch (err) {
			console.log(err);
			setRoomState({ ...roomState, room: undefined, error: { type: Errors.ROOM_NOT_CREATED } });
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

			setRoomState({ ...roomState, accessToken: response.data.token, error: undefined });
			return response.data.token;
		} catch (err) {
			console.log(err);
			setRoomState({ ...roomState, accessToken: null, error: { type: Errors.INVALID_TOKEN } });
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
		<MeetingContext.Provider value={{ roomState, isLoading, createRoom, isValidRoom, getAccessToken, setDefault, joinRoom, selectMeeting }}>
			{children}
		</MeetingContext.Provider>
	);
};
