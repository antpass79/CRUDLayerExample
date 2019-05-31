import { createSelector } from "@ngrx/store";
import { AppState } from "../states/app.state";
import { CommonState } from "../states/common.state";

const selectCommonState = (state: AppState) => state.common;

export const listenForBusy = createSelector(
    selectCommonState,
    (state: CommonState) => state.busy
);

export const listenForMessage = createSelector(
    selectCommonState,
    (state: CommonState) => state.message
);
