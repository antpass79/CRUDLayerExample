import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FrontEndComponent } from './front-end.component';
import { IAppConfig, AppConfig, ConfigLoader } from './app.config';
import { StoreModule, Store } from '@ngrx/store';
import { appReducer } from './store/reducers/app.reducer';
import { DashboardEffects } from './store/effects/dashboard.effects';
import { EffectsModule } from '@ngrx/effects';
import { provideBootstrapEffects } from './store/effects/provider.effects';

import { AgGridModule } from 'ag-grid-angular';
import { routes } from './routes';
import { AssetsComponent } from './components/assets/assets.component';
import { DetailsComponent } from './components/details/details.component';
import { GridUtilitiesService } from './services/grid-utils.service';
import { DateTimePipe } from './pipes/date-time.pipe';
import { DetailsEffects } from './store/effects/details.effects';
import { ButtonRendererComponent } from './components/assets/button-renderer/button-renderer.component';
import { ServerErrorsInterceptor } from './services/server-errors.interceptor';

@NgModule({
    declarations: [
        FrontEndComponent,
        AssetsComponent,
        DetailsComponent,
        DateTimePipe,
        ButtonRendererComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AgGridModule.withComponents([ButtonRendererComponent]),
        RouterModule.forRoot(routes, { useHash: true }),
        EffectsModule.forRoot([]),
        StoreModule.forRoot(appReducer)
    ],
    providers: [
        GridUtilitiesService,
        {
            provide: IAppConfig,
            useClass: AppConfig
        },
        {
            provide: APP_INITIALIZER,
            useFactory: ConfigLoader,
            deps: [IAppConfig],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ServerErrorsInterceptor,
            multi: true,
            deps: [Store]
          },      
        provideBootstrapEffects([DashboardEffects, DetailsEffects])
    ],
    bootstrap: [FrontEndComponent]
})
export class FrontEndModule {
}
