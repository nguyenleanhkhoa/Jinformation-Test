import { takeLatest, all, fork, put } from 'redux-saga/effects'
import { 
  FetchingDataEnum ,
  FetchingDataType,
  fetchingDataSuccessful,
  fetchingDataFailure,
} from '../actions/FetchingDataActions'

import * as fetchJsonp from 'fetch-jsonp'

/**
 * Common call post API
 * @param {*} url api url
 * @param {*} body 
 */
const callApi = async (url : string) : Promise <any>  => {

  try{
      const respone = await fetchJsonp(url,{
        jsonpCallbackFunction: 'jsonFlickrFeed'
      });

      return respone;

  }   
  catch(e){
      throw e;
  }
}

function* handleFetchingData(action : FetchingDataType) {
  try {
      const result = yield callApi(action.url);

      if(result === undefined) {
        yield put(fetchingDataFailure(-100, "Can't connect to server"));
        return;
      }

      const response = yield result.json();
      console.log(response.items);
      yield put(fetchingDataSuccessful(200, response.items));


  }
  catch(e){
    yield put(fetchingDataFailure(-100, e.message));
    throw e;
  };

}


function* watchFetchingDataRequest() {
  yield takeLatest(FetchingDataEnum.FETCHING_DATA, handleFetchingData)
}


export function* fetchingDataSaga() {
  yield all([fork(watchFetchingDataRequest)])
}