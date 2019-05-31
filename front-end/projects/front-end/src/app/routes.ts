import { Routes } from '@angular/router';
import { AssetsComponent } from './components/assets/assets.component';
import { DetailsComponent } from './components/details/details.component';

export const routes: Routes = [
  {
    path: "assets",
    component: AssetsComponent
  },
  {
    path: "details",
    component: DetailsComponent
  },
];
