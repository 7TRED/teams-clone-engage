import firebase from 'firebase';
import { db } from '../Firebase';
import { Room } from 'twilio-video';

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
 * Function to add newly created user to the database
 * @param {{roomTitle: string, roomDescription:string, room:Room}} room room Details
 * @param {string} userID  uid of the user who created the room
 * @returns {Promise<void>}
 */

export const addRoom = (room, userID) => {
	return db.collection('rooms').doc(room.sid).set({
		room      : room,
		createdAt : firebase.firestore.Timestamp.now(),
		owner     : userID,
	});
};

/**
 * Function to add a room to the list of rooms user has joined
 * @param {string} roomID  sid of twilio-video room
 * @param {string} userID  uid of the user joining or creating the room
 * @returns {Promise<void>}
 */

export const addRoomToParticipant = (roomID, userID) => {
	return db.collection('users').doc(userID).collection('rooms').doc(roomID).set({
		room : roomID,
	});
};

/**
 * Function to add participants to a room
 * @param {string} roomID  sid of twilio-video room
 * @param {string} userID  uid of the user joining or creating the room
 * @returns {Promise<void>}
 */

export const addParticipantToRoom = (roomID, userID) => {
	return db.collection('room').doc(roomID).collection('participants').doc(userID).set({
		uid      : userID,
		joinedAt : firebase.firestore.Timestamp.now(),
	});
};

/**
 * Function to get all the rooms user has Joined
 * @param {string} userID uid of a user whose room list is required
 * @param {function([])} callback callback to get back the result
 */

export const getAllParticipantRooms = (userID, callback) => {
	const ref = db.collection('users').doc(userID).collection('rooms');
	ref.get().onSnapshot((snapshot) => {
		let rooms = [];
		snapshot.forEach(async (res) => {
			rooms.push(await db.collection('rooms').doc(res.data().room).get());
		});
		callback(rooms);
	});
};

/**
 * Function to get all participants of a room 
 * @param {string} userID uid of a user whose room list is required
 * @param {function([])} callback callback to get back the result
 */

export const getAllRoomParticipants = (roomID, callback) => {
	const ref = db.collection('rooms').doc(roomID).collection('participants');
	ref.get().onSnapshot((snapshot) => {
		let rooms = [];
		snapshot.forEach(async (res) => {
			rooms.push(await db.collection('users').doc(res.data().uid));
		});

		callback(rooms);
	});
};

/**
 * Function to add a message to a room
 * @param {string} roomID  room ID of the current chat
 * @param {{sentAt: Date, content:string, sentBy:uid}} message message to be sent
 * @returns {Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>} reference to the added message doc
 */

export const addMessage = (roomID, message) => {
	return db.collection('chats').doc(roomID).collection('messages').add(message);
};

/**
 * Function to get all the messages of a room
 * @param {string} roomID room ID whose message is needed 
 * @param {function([])} callback to retrieve the list of messages 
 */
export const getAllMessages = (roomID, callback) => {
	const ref = db.collection('chats').doc(roomID).collection('messages').orderBy('sentAt', 'desc');
	ref.get().onSnapshot((snapshot) => {
		let messages = [];
		snapshot.forEach((doc) => messages.push({ id: doc.id, data: doc.data() }));

		callback(messages);
	});
};
