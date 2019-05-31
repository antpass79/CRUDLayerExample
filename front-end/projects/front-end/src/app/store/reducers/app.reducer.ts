import { AppState } from "../states/app.state";
import { ActionReducerMap } from "@ngrx/store";
import { dashboardReducer } from "./dashboard.reducer";
import { detailsReducer } from "./details.reducer";
import { commonReducer } from "./common.reducer";

export const appReducer: ActionReducerMap<AppState, any> = {
    common: commonReducer,
    dashboard: dashboardReducer,
    details: detailsReducer
}
