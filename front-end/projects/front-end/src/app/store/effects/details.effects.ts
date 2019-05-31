import { Injectable } from "@angular/core";
import { Effect, ofType, Actions } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, map, catchError, tap, finalize } from "rxjs/operators";

import { AssetsService } from "../../services/assets.service";
import { AppState } from "../states/app.state";
import { Store } from "@ngrx/store";
import { GetAllSuccess, GetAllFailure } from "projects/front-end/src/app/store/actions/dashboard.actions";
import { DetailsActionTypes, ShowSuccess, CreateSuccess, CreateFailure, ShowFailure, ModifySuccess, ModifyFailure, Create, Modify } from "../actions/details.actions";
import { Busy } from "../actions/common.actions";
import { Asset } from "../../models/models";

@Injectable()
export class DetailsEffects {

    constructor(
        private assetsService: AssetsService,
        private actions$: Actions,
        private store: Store<AppState>
    ) { }

    @Effect()
    show$ = this.actions$
        .pipe(
            tap(() => new Busy(true)),
            ofType(DetailsActionTypes.Show),
            tap(() => this.store.dispatch(new Busy(true))), // don't use store
            map((action: Asset) => action),
            switchMap((asset) => {

                return this.assetsService.getById(asset.id)
                    .pipe(
                        map((asset) => {
                            return new ShowSuccess(asset);
                        }),
                        catchError((error) => {
                            return of(new ShowFailure(error));
                        }),
                        finalize(() => {
                            this.store.dispatch(new Busy(false)); // don't use store
                        }));
            }));

    @Effect()
    create$ = this.actions$
        .pipe(
            tap(() => new Busy(true)),
            ofType(DetailsActionTypes.Create),
            tap(() => this.store.dispatch(new Busy(true))), // don't use store
            map((action: Create) => action.payload),
            switchMap((payload) => {

                return this.assetsService.create(payload)
                    .pipe(
                        map((asset) => {
                            return new CreateSuccess(asset);
                        }),
                        catchError((error) => {
                            return of(new CreateFailure(error));
                        }),
                        finalize(() => {
                            this.store.dispatch(new Busy(false)); // don't use store
                        }));
            }));

    @Effect()
    modify$ = this.actions$
        .pipe(
            tap(() => new Busy(true)),
            ofType(DetailsActionTypes.Modify),
            tap(() => this.store.dispatch(new Busy(true))), // don't use store
            map((action: Modify) => action.payload),
            switchMap((payload) => {

                return this.assetsService.modify(payload)
                    .pipe(
                        map((asset) => {
                            return new ModifySuccess(asset);
                        }),
                        catchError((error) => {
                            return of(new ModifyFailure(error));
                        }),
                        finalize(() => {
                            this.store.dispatch(new Busy(false)); // don't use store
                        }));
            }));

}
