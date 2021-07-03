import { useEffect, useState } from 'react';

export const usePublications = (participant) => {
	const [ publications, setPublications ] = useState([]);

	useEffect(
		() => {
			setPublications(participant ? [ ...participant.tracks.values() ] : []);

			const publicationAdded = (publication) => {
				setPublications([ ...publications, publication ]);
			};

			const publicationRemoved = (publication) => {
				setPublications(publications.forEach((p) => p !== publication));
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
