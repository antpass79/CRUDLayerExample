import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, map, catchError, tap, finalize } from "rxjs/operators";

import { AssetsService } from "../../services/assets.service";
import { AppState } from "../states/app.state";
import { Store } from "@ngrx/store";
import { DashboardActionTypes, GetAllSuccess, GetAllFailure, GetAll, Delete, DeleteSuccess, DeleteFailure } from "projects/front-end/src/app/store/actions/dashboard.actions";
import { Busy } from "../actions/common.actions";

@Injectable()
export class DashboardEffects {

    constructor(
        private assetsService: AssetsService,
        private actions$: Actions,
        private store: Store<AppState>
    ) { }

    @Effect()
    getAll$ = this.actions$
        .pipe(
            tap(() => new Busy(true)),
            ofType(DashboardActionTypes.GetAll),
            tap(() => this.store.dispatch(new Busy(true))), // don't use store
            map((action: GetAll) => action),
            switchMap(() => {

                return this.assetsService.getAll()
                    .pipe(
                        map((assets) => {
                            return new GetAllSuccess(assets);
                        }),
                        catchError((error) => {
                            return of(new GetAllFailure(error));
                        }),
                        finalize(() => {
                            this.store.dispatch(new Busy(false)); // don't use store
                        }));
            }));

    @Effect()
    delete$ = this.actions$
        .pipe(
            tap(() => new Busy(true)),
            ofType(DashboardActionTypes.Delete),
            tap(() => this.store.dispatch(new Busy(true))), // don't use store
            map((action: Delete) => action.payload),
            switchMap((payload) => {

                return this.assetsService.delete(payload.id)
                    .pipe(
                        map((asset) => {
                            this.store.dispatch(new GetAll()); // don't use store
                            return new DeleteSuccess(asset);
                        }),
                        catchError((error) => {
                            this.store.dispatch(new Busy(false)); // don't use store
                            return of(new DeleteFailure(error));
                        }));
            }));
}
