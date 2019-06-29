import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import ImageActionCreator from '../actions/ImageActionCreator';
import { LOAD_IMAGE } from '../constants/ActionTypes';

const api = {
    baseUrl: 'https://api.giphy.com/v1/gifs/trending',
    key: 'aMcf8zKGDl7IqLkLj85alm25UhQcHmLx'
}

// implementation
function* handleLoadImage(action) {
    const { data: { page, perPage } } = action;

    const res = yield call(axios.get, `${api.baseUrl}?api_key=${api.key}&limit=${perPage}&offset=${page * perPage}`);
    const totalPage = Math.ceil(res.data.pagination.total_count / perPage);

    const hasMoreItems = totalPage > (page + 1);
    yield put(ImageActionCreator.loadImageSuccess(res.data.data, page + 1, perPage, hasMoreItems));

}

function* ImageSaga() {
    yield takeLatest(LOAD_IMAGE, handleLoadImage);
}

export default ImageSaga;