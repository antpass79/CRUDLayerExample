import { createSelector } from "@ngrx/store";
import { DashboardState } from "../states/dashboard.state";
import { AppState } from "../states/app.state";

const selectDashboardState = (state: AppState) => state.dashboard;

export const listenForAssets = createSelector(
    selectDashboardState,
    (state: DashboardState) => state.assets
);
