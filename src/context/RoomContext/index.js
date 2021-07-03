import { createContext } from 'react';
import { useLocalMedia, useRoom, useHandleRoomDisconnection } from '../../hooks';

export const RoomContext = createContext(null);

export function RoomProvider ({ children }) {
	const { room, isConnecting, connect } = useRoom();
	// useHandleRoomDisconnection(room, removeLocalAudioTrack, removeLocalVideoTrack);

	return <RoomContext.Provider value={{ isConnecting, room, connect }}>{children}</RoomContext.Provider>;
}
