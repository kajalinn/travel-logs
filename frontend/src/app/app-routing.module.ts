import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddTravelLogComponent} from "./components/add-travel-log/add-travel-log.component";
import {EditTravelLogComponent} from "./components/edit-travel-log/edit-travel-log.component";
import {HomeComponent} from "./components/home/home.component";
import {ViewTravelLogComponent} from "./components/view-travel-log/view-travel-log.component";
import {GenerateReportComponent} from "./components/generate-report/generate-report.component";


const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full'},
  { path: 'Home', component: HomeComponent },
  { path: 'ViewTravelLog/:logId', component: ViewTravelLogComponent },
  { path: 'AddTravelLog', component: AddTravelLogComponent },
  { path: 'EditTravelLog/:logId', component: EditTravelLogComponent },
  { path: 'GenerateReport', component: GenerateReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
