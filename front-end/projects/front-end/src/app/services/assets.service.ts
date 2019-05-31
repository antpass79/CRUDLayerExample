import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asset } from "projects/front-end/src/app/models/models";
import { IAppConfig } from "projects/front-end/src/app/app.config";

@Injectable({
    providedIn: 'root'
})
export class AssetsService {

    // data members

    private _endpoint: string;

    // constructor

    constructor(
        private httpClient: HttpClient,
        appConfig: IAppConfig) {

            this._endpoint = appConfig.getValue('endpoint');
    }

    // public functions

    getAll(): Observable<Asset[]> {
        return this.httpClient.get<Asset[]>(this.buildEndpoint(), this.buildOptions());
    }

    getById(assetId: any): Observable<Asset> {
        return this.httpClient.get<Asset>(this.buildEndpoint(assetId), this.buildOptions());
    }

    create(asset: Asset): Observable<Asset> {
        return this.httpClient.put<Asset>(this.buildEndpoint(), JSON.stringify(asset), this.buildOptions());
    }

    modify(asset: Asset): Observable<Asset> {
        return this.httpClient.post<Asset>(this.buildEndpoint(), JSON.stringify(asset), this.buildOptions());
    }

    delete(assetId: any): Observable<any> {
        return this.httpClient.delete(this.buildEndpoint(assetId), this.buildOptions());
    }

    // private functions

    private buildEndpoint(param?: any) {

        return this._endpoint + (param ? param : "");
    }

    private buildOptions() {

        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });

        let options = ({ headers: headers });

        return options;
    }
}
