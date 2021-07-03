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
		} catch (err) {
			console.log(err);
			setRoomState({ ...roomState, roomDetails: undefined, error: { type: Errors.ROOM_NOT_CREATED } });
		} finally {
			setIsLoading(false);
		}
	};

	const isValidRoom = async (roomID) => {
		try {
			const response = await api.get('/room', {
				params : {
					room : roomID,
				},
			});

			const room = response.data;
			if (room.status === 'completed') return false;
			else return true;
		} catch (err) {
			return false;
		}
	};

	const getAccessToken = (roomID, identity) => {
		setIsLoading(true);
		api
			.get('/token', {
				params : {
					room     : roomID,
					identity : identity,
				},
			})
			.then((res) => {
				setRoomState({ ...roomState, accessToken: res.data.token, error: undefined });
			})
			.catch((err) => {
				console.log(err);
				setRoomState({ ...roomState, accessToken: null, error: { type: Errors.INVALID_TOKEN } });
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const setDefault = () => {
		setIsLoading(true);
		setRoomState(DEFAULT_STATE);
		setIsLoading(false);
	};

	return <MeetingContext.Provider value={{ roomState, isLoading, createRoom, isValidRoom, getAccessToken, setDefault }}>{children}</MeetingContext.Provider>;
};
