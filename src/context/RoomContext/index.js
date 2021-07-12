import { createContext } from 'react';
import { useRoom, useHandleRoomDisconnection } from '../../hooks';

export const RoomContext = createContext(null);

export function RoomProvider ({ children }) {
	const { room, isConnecting, connect, mediaSettings, setMediaSettings } = useRoom();
	useHandleRoomDisconnection(room);

	return <RoomContext.Provider value={{ isConnecting, room, connect, mediaSettings, setMediaSettings }}>{children}</RoomContext.Provider>;
}
