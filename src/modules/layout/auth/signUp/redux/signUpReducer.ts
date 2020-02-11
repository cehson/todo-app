import {SIGN_UP, signUp, SignUpType} from "./types";

const initState: signUp = {
	name: '',
	surname: '',
	email: '',
	password: ''
};

const signUpReducer = (state = initState, action: SignUpType): signUp => {
	switch (action.type) {
		case 'SIGNUP_SUCCESS':
			return {
				...state,
				authError: null
			};
		case 'SIGNUP_ERROR':
			return {
				...state,
				authError: action.err.message
			};
		default:
			return state;
	}
};

export default signUpReducer;
