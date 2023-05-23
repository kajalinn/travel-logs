import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpProviderService } from "../../service/http-provider.service";

@Component({
  selector: 'app-generate-report',
  templateUrl: './generate-report.component.html',
  styleUrls: ['./generate-report.component.scss']
})
export class GenerateReportComponent implements OnInit {
  generateReportForm: reportForm = new reportForm();
  travelLogList: any[] = [];
  totalDistance: number = 0;
  @ViewChild("reportForm", { static: false })
  reportForm!: NgForm;

  constructor(private router: Router, private httpProvider: HttpProviderService) {}

  ngOnInit(): void {}

  // Generates a report
  async GenerateReport(isValid: any) {
    if (isValid) {
      const { startDate, endDate, vehicleRegistrationNumber, vehicleOwnerName } = this.generateReportForm;
      const filterData = {
        startDate,
        endDate,
        vehicleRegistrationNumber,
        vehicleOwnerName
      };

      const isFilterDataEmpty = Object.values(filterData).every(value => value === '');

      // Fetch all travel logs if no filters provided
      if (isFilterDataEmpty) {
        this.httpProvider.getAllTravelLogs().subscribe(
          (data: any[]) => {
            console.log(data);
            this.travelLogList = data;
          },
          (error: any) => {
            console.error(error);
          }
        );
      } else {
        // Generate report based on filter data
        console.log(filterData);
        this.httpProvider.generateReport(filterData).subscribe(
          (data: any[]) => {
            this.travelLogList = data;
            // this.totalDistance = data.totalDistance;
          },
          (error: any) => {
            console.error(error);
          }
        );
      }
    }
  }

}

export class reportForm {
  startDate: string = '';
  endDate: string = '';
  vehicleRegistrationNumber: string = '';
  vehicleOwnerName: string = '';
}
