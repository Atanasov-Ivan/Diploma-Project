import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TempSensorComponent } from './temp-sensor/temp-sensor.component';
import { CatalogComponent } from './temp-sensor/catalog/catalog/catalog.component';
import { HomeComponent } from './temp-sensor/home/home.component';


const routes: Routes = [
  { path: '',redirectTo: 'home', pathMatch: 'full' },
  { path: 'sensors', component: TempSensorComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sensors/:productName', component: TempSensorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
