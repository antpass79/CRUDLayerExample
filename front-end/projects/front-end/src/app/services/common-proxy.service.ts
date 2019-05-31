import { Injectable } from '@angular/core';
import { AppState } from '../store/states/app.state';
import { Store, select } from '@ngrx/store';
import { listenForBusy, listenForMessage } from '../store/selectors/common.selector';

@Injectable({
    providedIn: 'root'
})
export class CommonProxyService {

    // constructor

    constructor(private store: Store<AppState>) {
    }

    // public functions

    listenForBusy() {
        return this.store.pipe(select(listenForBusy));
    }

    listenForMessage() {
        return this.store.pipe(select(listenForMessage));
    }
}
