import { combineReducers } from 'redux';
import * as Actions from '../actions/types';

const meeting = (state = {}, action) => {
	switch (action.type) {
		case Actions.CREATE_ROOM:
			return { ...state, ...action.payload };

		case Actions.GENERATE_TOKEN:
			return { ...state, ...action.payload };

		case Actions.CREATE_ROOM_ERROR:
			return { ...state, ...action.payload };

		case Actions.TOKEN_ERROR:
			return { ...state, ...action.payload };

		case Actions.CLEAR_LOCAL_TRACK:
			return { ...state, ...action.payload };

		case Actions.SET_MEDIA_CONFIG:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};

export default combineReducers({
	meeting,
});
