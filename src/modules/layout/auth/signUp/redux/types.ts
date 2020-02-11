export interface signUp  {
    name: string,
    surname: string,
    email: string,
    password: string
}

export const SIGN_UP = "SIGNUP_SUCCESS";

interface SignUpAction {
    type: typeof SIGN_UP;
    payload: signUp;
  }
  
  export type SignUpType = SignUpAction;