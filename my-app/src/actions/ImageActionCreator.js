import { LOAD_IMAGE, LOAD_IMAGE_SUCCESS } from './../constants/ActionTypes';

export default {
    loadImage: (page, perPage) => ({
        type: LOAD_IMAGE,
        data: {
            page,
            perPage
        }
    }),
    loadImageSuccess: (listImages, page, perPage, hasMoreItems) => ({
        type: LOAD_IMAGE_SUCCESS,
        data: {
            listImages,
            page,
            perPage,
            hasMoreItems,
        },
    })
}