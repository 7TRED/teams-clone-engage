import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAllParticipantRooms } from '../services/Firebase/firebaseDB';

export const useParticipantMeetings = () => {
	const { authState } = useContext(AuthContext);
	const [ meetings, setMeetings ] = useState([]);

	useEffect(() => {
		const callback = (snapshot) => {
			let rooms = [];
			snapshot.forEach((res) => {
				const data = res.data();
				rooms.push(data);
			});
			setMeetings(rooms);
		};
		getAllParticipantRooms(authState.user.uid, callback);
	}, []);

	return meetings;
};
