import { all, fork } from 'redux-saga/effects';

import { fetchingDataSaga } from './FetchingDataSaga'

export function* rootSaga() {
  yield all([fork(fetchingDataSaga)]);
}