import { DashboardState, getInitialDashboardState } from "./dashboard.state";
import { DetailsState, getInitialDetailsState } from "./details.state";
import { CommonState, getInitialCommonState } from "./common.state";

export interface AppState {
    common: CommonState,
    dashboard: DashboardState;
    details: DetailsState;    
}

const initialAppState: AppState = {
    common: getInitialCommonState(),
    dashboard: getInitialDashboardState(),
    details: getInitialDetailsState()
}

export function getInitialAppState(): AppState {
    return initialAppState;
}
