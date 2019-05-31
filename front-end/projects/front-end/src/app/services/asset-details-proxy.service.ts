import { Injectable } from '@angular/core';
import { AppState } from '../store/states/app.state';
import { Store, select } from '@ngrx/store';
import { listenForAsset } from '../store/selectors/details.selector';
import { Asset } from '../models/models';
import { Create, Modify, Show } from '../store/actions/details.actions';

@Injectable({
    providedIn: 'root'
})
export class AssetDetailsProxyService {

    // constructor

    constructor(private store: Store<AppState>) {
    }

    // public functions

    listenForAsset() {
        return this.store.pipe(select(listenForAsset));
    }

    createAsset(asset: Asset) {
        this.store.dispatch(new Create(asset));
    }

    modifyAsset(asset: Asset) {
        this.store.dispatch(new Modify(asset));
    }

    showAsset(asset: Asset) {
        this.store.dispatch(new Show(asset));
    }
}
