import { fork } from 'redux-saga/effects';
import ImageSaga from './ImageSaga';

function* RootSagas() {
    yield fork(ImageSaga);
}

export default RootSagas;