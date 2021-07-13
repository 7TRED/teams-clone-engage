import { useState, createContext } from 'react';
import { signin, signout } from '../../services/Firebase/firebaseAuth';
import { addUser } from '../../services/Firebase/firebaseDB';
import { auth } from '../../services/Firebase';

export const AuthContext = createContext(null);

const INITIAL_AUTH_STATE = {
	user      : {
		uid         : '',
		displayName : '',
		email       : '',
		photoURL    : '',
	},
	authToken : undefined,
	error     : {},
};

export const AuthProvider = ({ children }) => {
	const [ authState, setAuthState ] = useState(INITIAL_AUTH_STATE);
	const [ isLoading, setIsLoading ] = useState(false);

	const login = async () => {
		setIsLoading(true);
		try {
			const authCredentials = await signin();
			const user = authCredentials.user;
			addUser({
				displayName : user.displayName,
				uid         : user.uid,
				email       : user.email,
				photoURL    : user.photoURL,
			});
			const authToken = await user.getIdToken();
			setAuthState((prevState) => ({
				...prevState,
				user      : { uid: user.uid, displayName: user.displayName, email: user.email, photoURL: user.photoURL },
				authToken,
			}));
		} catch (err) {
			setAuthState((prevState) => ({ ...prevState, error: { type: err } }));
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async () => {
		setIsLoading(true);
		try {
			await signout();
			setAuthState((prevState) => ({ ...INITIAL_AUTH_STATE }));
		} catch (err) {
			setAuthState((prevState) => ({ ...prevState, error: { type: err } }));
		} finally {
			setIsLoading(false);
		}
	};

	const restoreToken = async () => {
		setIsLoading(true);
		try {
			auth.onAuthStateChanged(async (user) => {
				if (user) {
					const authToken = await user.getIdToken();
					setAuthState({
						...authState,
						user      : { uid: user.uid, displayName: user.displayName, email: user.email, photoURL: user.photoURL },
						authToken,
					});
				} else {
					setAuthState((prevState) => ({ ...INITIAL_AUTH_STATE }));
				}
			});
		} catch (err) {
			setAuthState((prevState) => ({ ...prevState, error: { type: err } }));
		} finally {
			setIsLoading(false);
		}
	};

	return <AuthContext.Provider value={{ authState, isLoading, login, logout, restoreToken }}>{children}</AuthContext.Provider>;
};
