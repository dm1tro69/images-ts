import {GET_PHOTOS, PhotoAction, PhotoState, SET_ERROR} from "../types";
import {Photo} from "pexels";

const initialState: PhotoState = {
    photos: [],
    total_results: 0,
    error: ''
}


const photosReducer = (state = initialState, action: PhotoAction): PhotoState => {
    switch (action.type)  {
        case GET_PHOTOS:
            const {page, photos, total_results} = action.payload
            let photoArr:Photo[] = []
            if (page > 1){
               photoArr = [...state.photos, ...photos]
            }else {
                photoArr = photos
            }
            return {...state, photos: photoArr, total_results, error: ''}
        case SET_ERROR:
            return {...state, error: action.payload}
        default: return state
    }
}
export default photosReducer