
import { useState, useEffect } from 'react';
import { useRoomContext } from './useRoomContext';

export const useParticipants = () => {
	const { room } = useRoomContext();
    const [participants, setParticipants] = useState(Array.from(room?.participants.values() ?? []));
    
    useEffect(() => {
        if (room) {
            const participantConnected = (participant) => {
                setParticipants([...participants, participant]);
            }
            const participantDisconnected = (participant) => {
                setParticipants(participants.filter(p => p !== participant));
            }

            room.on('participantConnected', participantConnected);
            room.on('participantDisconnected', participantDisconnected);

            return function cleanUp() {
                room.off('participantConnected', participantConnected);
                room.off('participantDisconnected', participantDisconnected);
            }
        }
    })

    return participants;
};
