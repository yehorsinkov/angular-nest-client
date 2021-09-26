import { Action, createAction, props } from '@ngrx/store';
import { User } from 'src/app/interface/user.interface';

export const USER_KEY = 'User';

export enum UserActions {
    loadUsers = '[User] Load Users',
    setLoggedUser = '[User] Set Logged User',
    addUser = '[User] Add User',
}

export class LoadUsers implements Action {
    readonly type = UserActions.loadUsers;

    constructor(public payload: User[]) {}
}

export class AddUser implements Action {
    readonly type = UserActions.addUser;

    constructor(public payload: User) {}
}

export class SetLoggedUser implements Action {
    readonly type = UserActions.setLoggedUser;

    constructor(public payload: User) {}
}

export type UserUnions =
    | LoadUsers
    | SetLoggedUser
    | AddUser
    ;