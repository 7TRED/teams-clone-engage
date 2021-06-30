import { useState, useEffect } from 'react';

export const useVideoDevices = () => {
	const [ videoDevices, setVideoDevices ] = useState([]);

	useEffect(() => {
		async function getVideoDevices () {
			try {
				const devices = await navigator.mediaDevices.enumerateDevices();
				setVideoDevices(devices.filter((device) => device.kind === 'videoinput'));
			} catch (err) {
				console.log(err);
			}
		}

		getVideoDevices();
	}, []);

	return videoDevices;
};
