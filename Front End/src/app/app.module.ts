import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TempSensorComponent } from './temp-sensor/temp-sensor.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { GoogleChartsModule } from 'angular-google-charts';
import { HeaderComponent } from './temp-sensor/_shared/header/header.component';
import { CatalogComponent } from './temp-sensor/catalog/catalog/catalog.component';
import { CatalogItemComponent } from './temp-sensor/catalog/catalog-item/catalog-item.component';
import { CatalogItemAddComponent } from './temp-sensor/catalog/catalog-item-add/catalog-item-add.component';
import { ControlsComponent } from './temp-sensor/controls/controls.component';
import { HomeComponent } from './temp-sensor/home/home.component';
import { ImageUploaderComponent } from './temp-sensor/catalog/catalog/image-uploader/image-uploader.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarkHeaderLinkDirective } from './temp-sensor/directives/mark-header-link.directive';

@NgModule({
  declarations: [
    AppComponent,
    TempSensorComponent,
    HeaderComponent,
    CatalogComponent,
    CatalogItemComponent,
    CatalogItemAddComponent,
    ControlsComponent,
    HomeComponent,
    ImageUploaderComponent,
    MarkHeaderLinkDirective,
  
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    GoogleChartsModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
