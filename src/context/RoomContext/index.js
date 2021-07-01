import { createContext } from 'react';
import { useLocalMedia, useRoom, useHandleRoomDisconnection } from '../../hooks';
import MEDIA_CONSTRAINTS from '../../constants/MediaConstraints';

export const RoomContext = createContext(null);

export function RoomProvider ({ children }) {
	const { localTracks, removeLocalAudioTrack, removeLocalVideoTrack, isAcquiringLocalTrack } = useLocalMedia(MEDIA_CONSTRAINTS);
	const { room, isConnecting, connect } = useRoom(localTracks, {});
	useHandleRoomDisconnection(room, removeLocalAudioTrack, removeLocalVideoTrack);

	return (
		<RoomContext.Provider value={{ localTracks, removeLocalAudioTrack, removeLocalVideoTrack, isConnecting, room, connect, isAcquiringLocalTrack }}>
			{children}
		</RoomContext.Provider>
	);
}
