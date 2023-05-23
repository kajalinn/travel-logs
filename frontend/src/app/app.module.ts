import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AddTravelLogComponent } from './components/add-travel-log/add-travel-log.component';
import { EditTravelLogComponent } from './components/edit-travel-log/edit-travel-log.component';
import { ViewTravelLogComponent } from './components/view-travel-log/view-travel-log.component';
import {NgModalConfirm} from './components/home/home.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http'
import {FormsModule} from "@angular/forms";
import { GenerateReportComponent } from './components/generate-report/generate-report.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddTravelLogComponent,
    EditTravelLogComponent,
    ViewTravelLogComponent,
    NgModalConfirm,
    GenerateReportComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
