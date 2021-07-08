import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getAllParticipantRooms } from '../services/Firebase/firebaseDB';
import { db } from '../services/Firebase';

export const useParticipantMeetings = () => {
	const { authState } = useContext(AuthContext);
	const [ meetings, setMeetings ] = useState([]);

	useEffect(() => {
		const callback = async (snapshot) => {
			let rooms = [];
			await snapshot.forEach((res) => {
				const data = res.data();
				console.log(data);
				data.room.get().then((room) => {
					rooms.push(room.data());
				});
			});
			console.log(rooms);
			setMeetings(rooms);
		};
		const ref = db.collection('users').doc(authState.user.uid).collection('rooms');
		ref.onSnapshot(callback);
	}, []);

	return meetings;
};
