import * as types from '../constants/ActionTypes';

var initialState = {
    listImages: [],
    perPage: 20,
    page: 0,
    hasMoreItems: true,
};

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOAD_IMAGE_SUCCESS:
            const { listImages, page, perPage, hasMoreItems } = action.data;
            return {
                ...state,
                listImages: [...state.listImages, ...listImages],
                page,
                perPage,
                hasMoreItems,
            }
        default: return state;
    }

}

export default myReducer;