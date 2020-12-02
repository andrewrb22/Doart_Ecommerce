import { PAINT_LIST_FAIL, PAINT_LIST_REQUEST, PAINT_LIST_SUCCESS,
     PAINT_DETAILS_REQUEST,PAINT_DETAILS_SUCCESS,PAINT_DETAILS_FAIL} from "../constants/paintConstants";

function paintListReducer(state = { paintings: [] }, action) {

    switch (action.type) {
        case PAINT_LIST_REQUEST:
            return { loading: true };
        case PAINT_LIST_SUCCESS:
            return { loading: false, paintings: action.payload };
        case PAINT_LIST_FAIL:
            return { loading: false, error: action.payload };
            default:
                return state;
    }
};
function paintDetailsReducer(state = { paint: {} }, action) {

    switch (action.type) {
        case PAINT_DETAILS_REQUEST:
            return { loading: true };
        case PAINT_DETAILS_SUCCESS:
            return { loading: false, paint: action.payload };
        case PAINT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
            default:
                return state;
    }
}
export { paintListReducer , paintDetailsReducer}