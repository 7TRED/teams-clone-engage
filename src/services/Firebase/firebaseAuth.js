import { auth } from '../Firebase';
import firebase from 'firebase';

export const signin = () => {
	const provider = new firebase.auth.GoogleAuthProvider();
	auth.useDeviceLanguage();
	return auth.signInWithPopup(provider);
};

export const signout = () => {
	return auth.signOut();
};
