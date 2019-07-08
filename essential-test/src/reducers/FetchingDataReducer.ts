import { FetchingDataEnum, ActionFetchingData } from '../actions/FetchingDataActions';

export interface FetchingDataStateType {
    isFetching: boolean,
    resultMessage: string,
    statusCode: number,
    resultData: any
}

export const initialState : FetchingDataStateType = {
    resultData: [],
    resultMessage: "",
    statusCode: -1,
    isFetching: false,
}

export function reducer( state : FetchingDataStateType = initialState, action: ActionFetchingData ) : FetchingDataStateType {
    switch(action.type){
        case FetchingDataEnum.FETCHING_DATA:{
            return {
                ...state,
                isFetching: true
            }
        };
        
        case FetchingDataEnum.FETCHING_DATA_SUCCESSFUL: {
            return {
                ...state,
                isFetching: false,
                statusCode: action.statusCode,
                resultData: action.resultData
            }
        };

        case FetchingDataEnum.FETCHING_DATA_FAILURE: {
            return {
                ...state,
                isFetching: false,
                statusCode: action.statusCode,
                resultMessage: action.resultMessage
            }
        };

        case FetchingDataEnum.REINIT_STATE: {
            return {
                ...state,
                isFetching: false,
                statusCode: -1,
            }
        };
        
        default: return state;
    };
}