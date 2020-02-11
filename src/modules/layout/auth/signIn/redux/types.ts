export interface SignIn {
  email: string;
  password: string;
}

// Describing the different ACTION NAMES available
export const SIGN_IN = "SIGN_IN";

interface SignInAction {
  type: typeof SIGN_IN;
  payload: SignIn;
}

export type SignInType = SignInAction;