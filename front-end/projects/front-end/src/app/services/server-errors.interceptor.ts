import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../store/states/app.state';
import { Error } from '../store/actions/common.actions';

@Injectable()
export class ServerErrorsInterceptor implements HttpInterceptor {

    // constructor

    constructor(private store: Store<AppState>) {
    }

    // public functions

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        this.store.dispatch(new Error(''));
        
        return next
            .handle(request)
            .pipe(
                catchError((error) => {

                    this.store.dispatch(new Error(error));
                    return throwError(error);
                })) as any;
    }
}
