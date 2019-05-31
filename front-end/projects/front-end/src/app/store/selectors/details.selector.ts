import { createSelector } from "@ngrx/store";
import { AppState } from "../states/app.state";
import { DetailsState } from "../states/details.state";

const selectDetailsState = (state: AppState) => state.details;

export const listenForAsset = createSelector(
    selectDetailsState,
    (state: DetailsState) => state.asset
);
