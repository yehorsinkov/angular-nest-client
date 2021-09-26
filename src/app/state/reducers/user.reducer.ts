import { User } from "src/app/interface/user.interface";
import { UserActions, UserUnions } from "../actions/user.actions";

export interface State {
    apiUrl: string;
    users: User[];
    loggedUser: User;
}

const defaultUser: User = {
    email: '',
    name: '',
    family_name: '',
    id: 0,
    password: ""
}

const initialState: State = {
    apiUrl: 'http://localhost:5000/',
    users: [],
    loggedUser: defaultUser
}

export function userReducer (
    state: State = initialState,
    action: UserUnions
): State {
    switch (action.type) {
        case UserActions.loadUsers:
            return {
                ...state,
                users: action.payload
            }
        case UserActions.setLoggedUser:
            return {
                ...state,
                loggedUser: action.payload
            }
        case UserActions.addUser:
            return {
                ...state,
                users: state.users.concat(action.payload)
            }
        default:
            return state;
    }
}