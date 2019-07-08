import { combineReducers } from 'redux';
import * as fetchingData from './FetchingDataReducer';

export interface State {
    fetchingData: fetchingData.FetchingDataStateType,
};

export const initialState: State = {
    fetchingData: fetchingData.initialState,
};

/**
 * Root reducer
 * The root reducer of the app is the reducer combined by all other reducers of the app.
 */
export const Reducers = combineReducers<State>({
    fetchingData: fetchingData.reducer
});

export type AppState = ReturnType<typeof Reducers>;