
import { API_TO_FETCH_DATA } from './../api/API';
//////////////////////////////////////// ENUMS ////////////////////////////////
export enum FetchingDataEnum {
    FETCHING_DATA = "FETCHING_DATA",
    FETCHING_DATA_SUCCESSFUL = "FETCHING_DATA_SUCCESSFUL",
    FETCHING_DATA_FAILURE = "FETCHING_DATA_FAILURE",
    REINIT_STATE = "REINIT_STATE_FETCHINGDATA"
};


//////////////////////////////////////// ACTION TYPE ////////////////////////////////

export interface FetchingDataType {
    type: FetchingDataEnum.FETCHING_DATA,
    url: string
};

export interface FetchingDataSuccessfulType {
    type: FetchingDataEnum.FETCHING_DATA_SUCCESSFUL,
    statusCode: number,
    resultData: any
};

export interface FetchingDataFailureType {
    type: FetchingDataEnum.FETCHING_DATA_FAILURE,
    statusCode: number,
    resultMessage: string
};

export interface ReinitStateFetchingDataType {
    type: FetchingDataEnum.REINIT_STATE
};


//////////////////////////////////////// ACTIONs ////////////////////////////////


export function fetchingData () : FetchingDataType {
    return {
        type: FetchingDataEnum.FETCHING_DATA,
        url: API_TO_FETCH_DATA
    };
};

export function fetchingDataSuccessful (statusCode: number, resultData: any) : FetchingDataSuccessfulType {
    return{
        type: FetchingDataEnum.FETCHING_DATA_SUCCESSFUL,
        statusCode,
        resultData
    }

};

export function fetchingDataFailure (statusCode: number, resultMessage: string) : FetchingDataFailureType {
    return{
        type: FetchingDataEnum.FETCHING_DATA_FAILURE,
        statusCode,
        resultMessage
    }

};

export function reinitStateFetchingData () : ReinitStateFetchingDataType {
    return{
        type: FetchingDataEnum.REINIT_STATE
    }
};


export type ActionFetchingData =    FetchingDataType |
                                    FetchingDataSuccessfulType | 
                                    FetchingDataFailureType |
                                    ReinitStateFetchingDataType;