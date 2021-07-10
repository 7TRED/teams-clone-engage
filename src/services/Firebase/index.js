import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey            : 'AIzaSyAvIzhgFzdaM71pDi0gusM_JJVD3pGJ00Y',
	authDomain        : 'teams-clone-c6129.firebaseapp.com',
	projectId         : 'teams-clone-c6129',
	storageBucket     : 'teams-clone-c6129.appspot.com',
	messagingSenderId : '635387790793',
	appId             : '1:635387790793:web:c27861f846e42def1cd418',
};

let app;
if (!firebase.apps.length) {
	app = firebase.initializeApp(firebaseConfig);
	firebase.firestore().enablePersistence();
}

export const auth = app.auth();
export const db = app.firestore();
