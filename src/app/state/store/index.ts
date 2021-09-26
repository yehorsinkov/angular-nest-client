import { createFeatureSelector, createSelector } from "@ngrx/store";
import { USER_KEY } from "../actions/user.actions";
import { State } from "../reducers/user.reducer";

export const userFeature: any = createFeatureSelector(USER_KEY);

export const getUsersSelector = createSelector(userFeature, (state: State) => state.users);
export const getLoggedUserSelector = createSelector(userFeature, (state: State) => state.loggedUser);
export const getApiUrl = createSelector(userFeature, (state: State) => state.apiUrl);
