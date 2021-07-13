import { useState, useEffect } from 'react';
import { useRoomContext } from '../hooks';

const useLocalPublications = () => {
    const { room } = useRoomContext();
    const [publications, setPublications] = useState(room?.localParticipant?.tracks?.values());

    useEffect(() => {
        
    })
}