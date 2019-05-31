import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetsProxyService } from '../../services/assets-proxy.service';
import { Asset, DetailsActionType } from '../../models/models';
import { GridUtilitiesService } from '../../services/grid-utils.service';
import { GridOptions } from 'ag-grid-community';
import { Router, NavigationExtras } from '@angular/router';
import { ButtonRendererComponent } from './button-renderer/button-renderer.component';

@Component({
    selector: 'assets',
    templateUrl: './assets.component.html',
    styleUrls: ['./assets.component.css']
})
export class AssetsComponent implements OnInit {

    // data members

    assets: Observable<Asset[]>;

    gridOptions: GridOptions;

    cellModifyParams: any;
    cellDeleteParams: any;

    // Constructor

    constructor(        
        public gridUtils: GridUtilitiesService,
        private router: Router,
        private assetsProxyService: AssetsProxyService) {

        this.assets = this.assetsProxyService.listenForAssets();

        this.cellModifyParams = {
            onClick: this.onBtnModify.bind(this),
            label: 'Modify'
        }
        this.cellDeleteParams = {
            onClick: this.onBtnDelete.bind(this),
            label: 'Delete'
        }

        this.gridOptions = <GridOptions>{

            rowSelection: 'single',
            enableSorting: true,
            suppressCellSelection: true,
            frameworkComponents: {
                buttonRenderer: ButtonRendererComponent,
              }
        };
    }

    // public functions

    ngOnInit() {
        this.onRefresh();
    }

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    onDoubleClick(selectedItems) {
        let navigationExtras: NavigationExtras = {
            state: {
                detailsActionType: DetailsActionType.show,
                asset: selectedItems[0]
            }
         };
         
         this.router.navigateByUrl("/details", navigationExtras);
    }

    onRefresh() {
        this.assetsProxyService.refreshAssets();
    }

    onCreate() {
        let navigationExtras: NavigationExtras = {
            state: {
                detailsActionType: DetailsActionType.create
            }
         };
         
         this.router.navigateByUrl("/details", navigationExtras);
    }

    onBtnModify(params: any) {
        let navigationExtras: NavigationExtras = {
            state: {
                detailsActionType: DetailsActionType.modify,
                asset: params.rowData
            }
         };
         
         this.router.navigateByUrl("/details", navigationExtras);
    }

    onBtnDelete(params: any) {
        this.assetsProxyService.deleteAsset(params.rowData);
    }
}
