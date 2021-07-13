import { useState, useEffect } from 'react';

/**
 * Calculates and returns x and y offsets to center the vided in the container
 * @param {number} vWidth video width
 * @param {number} vHeight video height
 * @param {number} cWidth  container width
 * @param {number} cHeight container height
 * @returns {{x: number, y: number}} offsets
 */

export function useOffsets (vWidth, vHeight, cWidth, cHeight) {
	const [ offsets, setOffsets ] = useState({ x: 0, y: 0 });

	useEffect(
		() => {
			if (vWidth && vHeight && cWidth && cHeight) {
				const x = vWidth > cWidth ? Math.round((vWidth - cWidth) / 2) : 0;

				const y = vHeight > cHeight ? Math.round((vHeight - cHeight) / 2) : 0;

				setOffsets({ x, y });
			}
		},
		[ vWidth, vHeight, cWidth, cHeight ],
	);

	return offsets;
}
