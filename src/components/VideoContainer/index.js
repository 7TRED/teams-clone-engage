import React, {useState} from 'react';
import { useParticipants, useRoomContext } from '../../hooks';
import ParticipantVideoCard from '../ParticipantVideoCard'
import './styles.css';

let _margin = 5;
let _w = 0;

function VideoContainer (props) {
    const { room } = useRoomContext();
    const [cardWidthAndMargin, setCardWidthAndMargin] = useState({ width: 0, margin: 5 });
    const localParticipant = room?.localParticipant;
    const participants = useParticipants();
    const containerRef = React.useRef(null);

    React.useEffect(() => {
        calcWidth();
    }, [participants, props.widthChanged]);

    React.useEffect(() => {
        window.addEventListener('resize', calcWidth);
        return () => {
            window.removeEventListener('resize', calcWidth);
        }
    },[])

    // to calculate the max width a Participant card can acquire while maintaining the aspect ratio
    const calcWidth = () => {
        _margin = 5;
        const offsetWidth = containerRef.current? containerRef.current.offsetWidth: 1428;
        const offsetHeight = containerRef.current? containerRef.current.offsetHeight: 883;
    
        const WIDTH = offsetWidth - 2 * _margin;
        const HEIGHT = offsetHeight - 2 * _margin;

        _w = 0;
        for (let i = 1; i < 5000; i++){
            _w = Area(i, participants.length+1, WIDTH, HEIGHT, _margin);
            if (_w === false) {
                _w = i - 1;
                break;
            }
        }
        setCardWidthAndMargin({ width: _w - _margin * 2, margin: _margin });
    }

    return ( 
        <div className={'container'} ref={containerRef}>
            <ParticipantVideoCard participant={localParticipant} isLocalParticipant={true} cardWidthAndMargin={cardWidthAndMargin} />
            {
                participants.map(participant => {
                    return (
                        <ParticipantVideoCard participant={participant} isLocalParticipant={false} key={participant.sid} cardWidthAndMargin={cardWidthAndMargin} />
                    )
                })
            }
        </div>
    )        
}




// function to get the maximum width that can be acquired by video blocks
function Area (increment, count = 1, WIDTH, HEIGHT, MARGIN = 10) {
	let i = 0,
		width = 0;
	let h = increment * (9/16) + MARGIN * 2;
	while (i < count) {
		if ((width + increment) > WIDTH) {
			width = 0;
			h = h + increment * (9/16) + MARGIN * 2;
		}
		width = width + increment + MARGIN * 2;
		i++;
	}
	if (h > HEIGHT) return false;
	return increment;
}



export default VideoContainer;
