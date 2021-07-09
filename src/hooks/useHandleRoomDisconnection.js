import { useEffect, useContext } from 'react';
import history from '../history';
import { MeetingContext } from '../context/MeetingContext';

export function useHandleRoomDisconnection (room) {
	const { setDefault } = useContext(MeetingContext);
	useEffect(
		() => {
			if (room) {
				const onDisconnected = (_, error) => {
					if (error) {
						console.log(error);
					}
					history.replace('/');
				};

				room.on('disconnected', onDisconnected);

				return function cleanUp () {
					room.off('disconnected', onDisconnected);
				};
			}
		},
		[ room ],
	);
}
