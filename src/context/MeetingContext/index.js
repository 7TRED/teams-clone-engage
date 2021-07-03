import { useState, createContext } from 'react';
import api from '../../services/api';
import history from '../../history';

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
	roomDetails : undefined,
	accessToken : null,
	error       : undefined,
	userName    : undefined,
};

export const MeetingContext = createContext(null);

export const MeetingProvider = ({ children }) => {
	//states
	const [ roomState, setRoomState ] = useState(DEFAULT_STATE);
	const [ isLoading, setIsLoading ] = useState(false);

	//functions
	const createRoom = async () => {
		setIsLoading(true);
		try {
			const response = await api.get('/rooms');
			console.log(response);
			setRoomState({ ...roomState, roomDetails: response.data, error: undefined });
			return response.data;
		} catch (err) {
			console.log(err);
			setRoomState({ ...roomState, roomDetails: undefined, error: { type: Errors.ROOM_NOT_CREATED } });
		} finally {
			setIsLoading(false);
		}
	};

	const isValidRoom = async (roomID) => {
		setIsLoading(true);
		let result = false;
		try {
			const response = await api.get('/room', {
				params : {
					room : roomID,
				},
			});
			const room = response.data;
			if (room.status && room.status === 'in-progress') result = true;
			else result = false;
		} catch (err) {
			result = false;
		} finally {
			setIsLoading(false);
		}

		return result;
	};

	const getAccessToken = async (roomID, identity) => {
		try {
			const response = await api.get('/token', {
				params : {
					room : roomID,
				},
			});

			setRoomState({ ...roomState, accessToken: response.data.token, error: undefined, userName: identity });
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

	return <MeetingContext.Provider value={{ roomState, isLoading, createRoom, isValidRoom, getAccessToken, setDefault }}>{children}</MeetingContext.Provider>;
};
