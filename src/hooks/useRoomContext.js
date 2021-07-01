import { useContext } from 'react';
import { RoomContext } from '../context/RoomContext';

export const useRoomContext = () => {
	const context = useContext(RoomContext);

	if (context) {
		return context;
	} else {
		throw new Error('useRoomContext must be within RoomProvider');
	}
};
