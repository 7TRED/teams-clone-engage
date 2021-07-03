import React, {useEffect, useState} from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useParticipants, useRoomContext } from '../../hooks';
import Participant from '../Participant';
import Measure from 'react-measure';

import './styles.css';

function VideoContainer () {
    const { room } = useRoomContext();
    const [cardWidthAndMargin, setCardWidthAndMargin] = useState({width:0, margin:0});
    
    console.log(room);
    const localParticipant = room?.localParticipant;
    const participants = useParticipants();
    console.log(participants);

    
    if (participants.length === 0) return null;

    
    const calcWidth = (contentRect) => {
        let margin = 5;
        const offsetWidth = contentRect? contentRect.bounds.width: 1428;
        const offsetHeight = contentRect? contentRect.bounds.height: 883;
        console.log(offsetWidth, offsetHeight);
        const WIDTH = offsetWidth - 2 * margin;
        const HEIGHT = offsetHeight - 2 * margin;

        console.log(WIDTH, HEIGHT);

        let w = 0;
        for (let i = 1; i < 5000; i++){
            w = Area(i, participants.length, WIDTH, HEIGHT, margin);
            if (w === false) {
                w = i - 1;
                break;
            }
        }

        console.log(w);
        setCardWidthAndMargin({ width: w - margin * 2, margin: margin });
    }
    

    return <Measure  bounds onResize={calcWidth}>
        {({ measureRef }) => {
            return (
                <div className={'container'} ref={measureRef}>
                     <Participant participant={localParticipant} isLocalParticipant={true} cardWidthAndMargin={cardWidthAndMargin}/>
                    {
                        participants.map(participant => {
                            return (
                                <Participant participant={participant} isLocalParticipant={false} key={participant.sid}cardWidthAndMargin={cardWidthAndMargin} />   
                            )
                        })
                    }
                    
                </div>
            )
        }}
    </Measure> 
}




// function to get the maximum width that can be acquired by video blocks
function Area (increment, count = 1, WIDTH, HEIGHT, MARGIN = 10) {
	let i = 0,
		w = 0;
	let h = increment * (9/16) + MARGIN * 2;
	while (i < count) {
		if ((w + increment) > WIDTH) {
			w = 0;
			h = h + increment * (9/16) + MARGIN * 2;
		}
		w = w + increment + MARGIN * 2;
		i++;
	}
	if (h > HEIGHT) return false;
	return increment;
}



export default VideoContainer;
