import firebase from 'firebase';
import { db } from '../Firebase';

/**
 * Function to add user to the database
 * @param {{uid:string, displayName:string, email:string, photoURL:string}} user 
 * @returns {Promise<void>}
 */
export const addUser = (user) => {
	return db.collection('users').doc(user.uid).set({
		uid         : user.uid,
		displayName : user.displayName,
		email       : user.email,
		photoURL    : user.photoURL,
		joinedAt    : firebase.firestore.Timestamp.now(),
	});
};

/**
 * Function to fetch User
 * @param {string} userID Id of the user to be fetched
 * @returns {Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>} 
 */

export const fetchUser = (userID) => {
	const ref = db.collection('users').doc(userID);
	return ref.get();
};

/**
 * Function to add newly created user to the database
 * @param {{roomTitle: string, roomDescription:string, roomID:string}} room room Details
 * @param {string} userID  uid of the user who created the room
 * @returns {Promise<void>}
 */

export const addRoom = (room, user) => {
	return db.collection('rooms').doc(room.roomID).set({
		...room,
		createdAt : firebase.firestore.Timestamp.now(),
		owner     : { ...user },
	});
};

/**
 * 
 * @param {string} roomID ID of the room to be fetched
 * @returns {Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>}
 */

export const fetchRoom = (roomID) => {
	const ref = db.collection('rooms').doc(roomID);
	return ref.get();
};

/**
 * Function to add a room to the list of rooms user has joined
 * @param {string} roomID  sid of twilio-video room
 * @param {string} userID  uid of the user joining or creating the room
 * @returns {Promise<void>}
 */

export const addRoomToParticipant = (room, userID) => {
	return db.collection('users').doc(userID).collection('rooms').doc(room.roomID).set({
		room     : { ...room },
		joinedAt : new Date().toISOString(),
	});
};

/**
 * Removes the specified room from the participant's rooms list
 * @param {string} roomID 
 * @param {string} userID 
 * @returns {Promise<void>}
 */

export const removeRoomFromParticipant = (roomID, userID) => {
	return db.collection('users').doc(userID).collection('rooms').doc(roomID).delete();
};

/**
 * Function to add participants to a room
 * @param {string} roomID  sid of twilio-video room
 * @param {string} userID  uid of the user joining or creating the room
 * @returns {Promise<void>}
 */

export const addParticipantToRoom = (roomID, user) => {
	return db.collection('rooms').doc(roomID).collection('participants').doc(user.uid).set({
		user : { ...user },
	});
};

/**
 * Removes a specified participant from the room
 * @param {string} roomID 
 * @param {string} userID 
 * @returns {Promise<void>}
 */

export const removeParticipantFromRoom = (roomID, userID) => {
	return db.collection('rooms').doc(roomID).collection('participants').doc(userID).delete();
};

/**
 * Function to get all the rooms user has Joined
 * @param {string} userID uid of a user whose room list is required
 * @param {function([])} callback callback to get back the result
 */

export const getAllParticipantRooms = (userID, callback) => {
	const ref = db.collection('users').doc(userID).collection('rooms').orderBy('joinedAt', 'desc');
	return ref.onSnapshot(callback);
};

/**
 * Function to get all participants of a room 
 * @param {string} userID uid of a user whose room list is required
 * @param {function([])} callback callback to get back the result
 */

export const getAllRoomParticipants = (roomID, callback) => {
	const ref = db.collection('rooms').doc(roomID).collection('participants');
	return ref.onSnapshot(callback);
};

/**
 * Function to add a message to a room
 * @param {string} roomID  room ID of the current chat
 * @param {{ content:string, sentBy:uid}} message message to be sent
 * @returns {Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>} reference to the added message doc
 */

export const addMessage = (roomID, message) => {
	return db.collection('rooms').doc(roomID).collection('messages').add({
		sentAt  : message.sentAt,
		content : message.content,
		sentBy  : { ...message.sentBy },
	});
};

/**
 * Function to get all the messages of a room
 * @param {string} roomID room ID whose message is needed 
 * @param {function(firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>)} callback to retrieve the list of messages 
 * @returns {()=>void}
 */
export const getAllMessages = (roomID, callback) => {
	const ref = db.collection('rooms').doc(roomID).collection('messages').orderBy('sentAt', 'desc');
	return ref.onSnapshot(callback);
};
