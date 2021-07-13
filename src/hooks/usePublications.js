import { useEffect, useState } from 'react';

/**
 * Returns all the publications published by a participant and adds event listeners
 * to track the trackPublished and trackUnpublished events.
 */

export const usePublications = (participant) => {
	const [ publications, setPublications ] = useState([]);

	useEffect(
		() => {
			setPublications(participant ? [ ...participant.tracks.values() ] : []);

			const publicationAdded = (publication) => {
				setPublications([ ...publications, publication ]);
			};

			const publicationRemoved = (publication) => {
				setPublications(publications.filter((p) => p !== publication));
			};

			participant?.on('trackPublished', publicationAdded);
			participant?.on('trackUnpublished', publicationRemoved);

			return function cleanup () {
				participant?.off('trackPublished', publicationAdded);
				participant?.off('trackUnpublished', publicationRemoved);
			};
		},
		[ participant ],
	);

	return publications;
};
