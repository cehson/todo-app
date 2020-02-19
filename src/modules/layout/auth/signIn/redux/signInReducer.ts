import {SignIn, SignInType} from './types';

const initState: SignIn = {
	email: '',
	password: '',
	authError: false
};

const signInReducer = (state = initState, action: SignInType): SignIn => {
	switch (action.type) {
		case 'LOGIN_SUCCESS' :
			return {
				...state,
				authError: false,
				loggedInUserID: action.res.user.uid
			};

		case 'GET_DATA_FROM_USER' :
			return {
				...state,
				loggedInUserData: action.data
			};

		case 'LOGIN_WITH_FB_SUCCESS' :
			return {
				...state,
				authError: false,
                logedInWithFacebook: true
			};
		case 'LOGIN_ERROR' :
			console.log(state);
			return {
				...state,
				authError: true
			};

		case 'SIGNOUT_SUCCESS' :
			console.log('signout success');
			return {...state,
                authError: true,
                logedInWithFacebook: false
            };

		default :
			return {
				...state,
				...initState
			};
	}
};

export default signInReducer;
