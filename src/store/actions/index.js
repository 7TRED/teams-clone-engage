import * as Actions from './types';
import api from '../../services/api';
import history from '../../history';

import { connect, createLocalTracks } from 'twilio-video';
import MEDIA_CONSTRAINTS from '../../constants/MediaConstraints';

export const createRoom = () => {
	return async (dispatch) => {
		try {
			const response = await api.get('/Rooms');
			dispatch({
				type    : Actions.CREATE_ROOM,
				payload : {
					room : response.data,
				},
			});

			history.push(`/room/${response.data.uniqueName}`);
		} catch (err) {
			dispatch({
				type    : Actions.CREATE_ROOM_ERROR,
				payload : {
					error : {
						type : Actions.CREATE_ROOM,
						err  : err,
					},
				},
			});
		}
	};
};

export const generateToken = (identity, roomName) => {
	return async (dispatch) => {
		try {
			const response = await api.get('/token', {
				params : {
					identity : identity,
					roomName,
				},
			});

			dispatch({
				type    : Actions.GENERATE_TOKEN,
				payload : {
					...response.data,
				},
			});
		} catch (err) {
			dispatch({
				type  : Actions.TOKEN_ERROR,
				error : {
					type : Actions.GENERATE_TOKEN,
					err,
				},
			});
		}
	};
};

export const setMediaConfig = (mediaConfig) => {
	return (dispatch) => {
		dispatch({
			type    : Actions.SET_MEDIA_CONFIG,
			payload : {
				localMediaConfig : mediaConfig,
			},
		});
	};
};
