import { Injectable } from '@angular/core';
import { AppState } from '../store/states/app.state';
import { Store, select } from '@ngrx/store';
import { listenForAssets } from '../store/selectors/dashboard.selector';
import { GetAll, Delete } from '../store/actions/dashboard.actions';
import { Asset } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class AssetsProxyService {

    // constructor

    constructor(private store: Store<AppState>) {
    }

    // public functions

    listenForAssets() {
        return this.store.pipe(select(listenForAssets));        
    }

    refreshAssets() {
        this.store.dispatch(new GetAll());
    }

    deleteAsset(asset: Asset) {
        this.store.dispatch(new Delete(asset));
    }
}
