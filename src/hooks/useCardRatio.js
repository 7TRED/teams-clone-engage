import { useState, useCallback } from 'react';

/**
 * Returns the aspect ratio of a video, and function to calculate the aspect ratio.
 * @param {number} initialRatio 
 * @returns {[aspectRatio:number, calculateRatio:(height:number, width:number)=>void]} 
 */

export function useCardRatio (initialRatio) {
	const [ aspectRatio, setAspectRatio ] = useState(initialRatio);

	const calculateRatio = useCallback((height, width) => {
		if (height && width) {
			const isLandscape = height <= width;
			const ratio = isLandscape ? width / height : height / width;

			setAspectRatio(ratio);
		}
	}, []);

	return [ aspectRatio, calculateRatio ];
}
