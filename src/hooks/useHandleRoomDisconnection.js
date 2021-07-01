import { useEffect } from 'react';

export function useHandleRoomDisconnection (room, removeLocalVideoTrack, removeLocalAudioTrack) {
	useEffect(
		() => {
			if (room) {
				const onDisconnected = (_, error) => {
					if (error) {
						console.log(error);
					}

					removeLocalVideoTrack();
					removeLocalAudioTrack();
				};

				room.on('disconnected', onDisconnected);

				return function cleanUp () {
					room.off('disconnected', onDisconnected);
				};
			}
		},
		[ room, removeLocalVideoTrack, removeLocalAudioTrack ],
	);
}
