import {createClient, ErrorResponse, Photos, PhotosWithTotalResults} from 'pexels'
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {GET_PHOTOS, PhotoAction, SET_ERROR} from "../types";

const client = createClient(process.env.REACT_APP_PEXELS || '')

export const getPhotos = (page: number, searchQuery:string, onSuccess: () => void, onError: () => void): ThunkAction<void, RootState, null, PhotoAction> => {
    return async (dispatch) => {
        try {
            const photos: PhotosWithTotalResults | ErrorResponse = await client.photos.search({page, query:searchQuery, per_page: 10})
            if ('error' in photos) {
                throw new Error(photos.error)
            }else {
                dispatch({
                    type: GET_PHOTOS,
                    payload: {
                        photos: photos.photos,
                        page: page,
                        total_results: photos.total_results,
                    }
                })
                onSuccess()
            }
        }catch (e: any) {
           dispatch(setError(e.message))
            onError()
        }
    }
}

export const getCuratedPhotos = (page: number, onSuccess: () => void, onError: () => void): ThunkAction<void, RootState, null, PhotoAction> => {
    return async (dispatch) => {
        try {
            const photos: Photos | ErrorResponse = await client.photos.curated({page, per_page: 10})
            if ('error' in photos) {
                throw new Error(photos.error)
            }else {
                dispatch({
                    type: GET_PHOTOS,
                    payload: {
                        photos: photos.photos,
                        page: page,
                        total_results: 0,
                    }
                })
                onSuccess()
            }
        }catch (e: any) {
            dispatch(setError(e.message))
            onError()
        }
    }
}

export const setError = (err: string): PhotoAction => {
    return {
        type: SET_ERROR,
        payload: err
    }
}

