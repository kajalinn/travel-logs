import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

let apiUrl = "http://localhost:8080/";

let httpLink = {
  getAllTravelLogs: apiUrl + "/backend/api/travellogs/getAllTravelLogs",
  deleteTravelLogById: apiUrl + "/backend/api/travellogs/deleteTravelLogById",
  getTravelLogById: apiUrl + "/backend/api/travellogs/getTravelLogById",
  saveTravelLog: apiUrl + "/backend/api/travellogs/saveTravelLog",
}
@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllTravelLogs(): Observable<any> {
    return this.webApiService.get(httpLink.getAllTravelLogs);
  }
  public deleteTravelLogById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteTravelLogById + '?logId=' + model, "");
  }
  public getTravelLogById(model: any): Observable<any> {
    console.log(httpLink.getTravelLogById + '/' + model);
    return this.webApiService.get(httpLink.getTravelLogById + '/' + model);
  }
  public saveTravelLog(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveTravelLog, model);
  }
  public updateTravelLog(logId: number, model: any): Observable<any> {
    console.log(httpLink.saveTravelLog + `/${logId}`, model);
    return this.webApiService.post(httpLink.saveTravelLog + `/${logId}`, model);
  }
}
