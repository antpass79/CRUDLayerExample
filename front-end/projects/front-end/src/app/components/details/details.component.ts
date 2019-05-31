import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Asset } from '../../models/models';
import { map } from 'rxjs/operators';
import { AssetDetailsProxyService } from '../../services/asset-details-proxy.service';
import { getInitialDetailsState } from '../../store/states/details.state';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'asset-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

    // data members

    state$: Observable<any>;

    assetForm: FormGroup;

    // Constructor

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private assetDetailsProxyService: AssetDetailsProxyService) {    
    }

    // public functions

    ngOnInit() {

        this.state$ = this.activatedRoute.paramMap
            .pipe(map(() => window.history.state));

        this.state$.subscribe((state) => {
             let asset: Asset = state.asset ? state.asset : getInitialDetailsState().asset;

             this.assetForm = this.formBuilder.group({
                id: new FormControl(asset.id),
                fileName: new FormControl(asset.fileName, Validators.required),
                mimeType: new FormControl(asset.mimeType, Validators.required),
                createdBy: new FormControl(asset.createdBy, Validators.required),
                description: new FormControl(asset.description, Validators.required),
                email: new FormControl(asset.email, [Validators.required, Validators.email]),
                country: new FormControl(asset.country, Validators.required)
             });             
        });
    }

    onCreate() {
        this.assetDetailsProxyService.createAsset(this.assetForm.value);
    }

    onModify() {
        this.assetDetailsProxyService.modifyAsset(this.assetForm.value);
    }

    onBack() {
        this.router.navigateByUrl('/assets');
    }
}
