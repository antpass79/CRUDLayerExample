import { Component, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonProxyService } from './services/common-proxy.service';

@Component({
    selector: 'front-end',
    templateUrl: './front-end.component.html',
    styleUrls: ['./front-end.component.css']
})
export class FrontEndComponent {

    // data members

    busy$: Observable<boolean>;
    message$: Observable<string>;

    // Constructor

    constructor(private commonProxyService: CommonProxyService) {

        this.busy$ = this.commonProxyService.listenForBusy();
        this.message$ = this.commonProxyService.listenForMessage();
    }
}
