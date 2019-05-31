import { CommonActions, CommonActionTypes } from "../actions/common.actions";
import { getInitialCommonState, CommonState } from "../states/common.state";

export const commonReducer = (
    state = getInitialCommonState(),
    action: CommonActions
): CommonState => {

    switch (action.type) {
        case CommonActionTypes.Busy: {
            return {
                ...state, busy: action.payload
            };
        }

        case CommonActionTypes.Error: {
            return {
                ...state, message: action.payload ? "Error from Server" : ''
            };
        }

        default:
            return state;
    }
}
