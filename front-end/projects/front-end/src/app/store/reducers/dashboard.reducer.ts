import { DashboardState, getInitialDashboardState } from "../states/dashboard.state";
import { DashboardActionTypes, DashboardActions } from "../actions/dashboard.actions";

export const dashboardReducer = (
    state = getInitialDashboardState(),
    action: DashboardActions
): DashboardState => {

    switch (action.type) {
        case DashboardActionTypes.GetAllSuccess: {
            return {
                ...state, assets: action.payload, message: ''
            };
        }
        case DashboardActionTypes.GetAllFailure: {
            return {
                ...state, assets: [], message: 'Error during refresh'
            };
        }
        case DashboardActionTypes.DeleteSuccess: {
            return {
                ...state, message: ''
            };
        }
        case DashboardActionTypes.DeleteFailure: {
            return {
                ...state, message: 'Error during delete'
            };
        }

        default:
            return state;
    }
}
