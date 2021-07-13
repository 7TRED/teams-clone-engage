import { createContext } from 'react';
import { useRoom, useHandleRoomDisconnection } from '../../hooks';

/**
 * Room context stores the current connected room. It also provides function to connect to a room.
 * and a connection log.
 */

export const RoomContext = createContext(null);

export function RoomProvider ({ children }) {
	const { room, isConnecting, connect, connectLog } = useRoom();
	const [ disconnectLog ] = useHandleRoomDisconnection(room);

	return <RoomContext.Provider value={{ isConnecting, room, connect, connectLog, disconnectLog }}>{children}</RoomContext.Provider>;
}
