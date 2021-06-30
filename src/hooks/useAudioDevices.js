import { useState, useEffect } from 'react';

export const useAudioDevices = () => {
	const [ audioDevices, setAudioDevices ] = useState([]);

	useEffect(() => {
		async function getAudioDevices () {
			try {
				const devices = await navigator.mediaDevices.enumerateDevices();
				setAudioDevices(devices.filter((device) => device.kind === 'audioinput'));
			} catch (err) {
				console.log(err);
			}
		}

		getAudioDevices();
	}, []);

	return audioDevices;
};
