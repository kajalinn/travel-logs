import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

// Base URL for the API
let apiUrl = "http://localhost:8080/";


// Define the different API endpoints
let httpLink = {
  getAllTravelLogs: apiUrl + "/backend/api/travellogs/getAllTravelLogs",
  deleteTravelLogById: apiUrl + "/backend/api/travellogs/deleteTravelLogById",
  getTravelLogById: apiUrl + "/backend/api/travellogs/getTravelLogById",
  saveTravelLog: apiUrl + "/backend/api/travellogs/saveTravelLog",
  generateReport: apiUrl + "/backend/api/travellogs/generateReport"
}
@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }


  // Retrieves all travel logs
  public getAllTravelLogs(): Observable<any> {
    return this.webApiService.get(httpLink.getAllTravelLogs);
  }

  // Retrieves a travel log by its ID
  public getTravelLogById(model: any): Observable<any> {
    return this.webApiService.get(httpLink.getTravelLogById + '/' + model);
  }

  // Deletes a travel log by its ID
  public deleteTravelLogById(model: any): Observable<any> {
    return this.webApiService.post(httpLink.deleteTravelLogById + '/' + model, "");
  }

  // Saves a new travel log
  public saveTravelLog(model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveTravelLog, model);
  }

  // Updates a travel log by its ID
  public updateTravelLog(logId: number, model: any): Observable<any> {
    return this.webApiService.post(httpLink.saveTravelLog + `/${logId}`, model);
  }

  // Generates a report based on specified parameters
  public generateReport(model: any): Observable<any> {
    return this.webApiService.getX(httpLink.generateReport, model);
  }
}
