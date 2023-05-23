import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {HttpProviderService} from "../../service/http-provider.service";

@Component({
  selector: 'app-edit-travel-log',
  templateUrl: './edit-travel-log.component.html',
  styleUrls: ['./edit-travel-log.component.scss']
})
export class EditTravelLogComponent implements OnInit {
  editTravelLogForm: travellogForm = new travellogForm();

  @ViewChild("travellogForm")
  travellogForm!: NgForm;

  isSubmitted: boolean = false;
  logId: any;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router,
              private httpProvider: HttpProviderService) { }

  ngOnInit(): void {
    this.logId = Number(this.route.snapshot.params['logId']);
    this.getTravelLogById();
  }

  // Fetches the travel log by ID
  getTravelLogById() {
    this.httpProvider.getTravelLogById(this.logId).subscribe((data: any) => {
        if (data != null && data.body != null) {
          let resultData = data.body;
          if (resultData) {
            // Assign fetched data to form fields
            this.editTravelLogForm.Id = this.logId;
            this.editTravelLogForm.travelDate = resultData.travelDate;
            this.editTravelLogForm.vehicleRegistrationNumber = resultData.vehicleRegistrationNumber;
            this.editTravelLogForm.vehicleOwnerName = resultData.vehicleOwnerName;
            this.editTravelLogForm.odometerBefore = resultData.odometerBefore;
            this.editTravelLogForm.odometerAfter = resultData.odometerAfter;
            this.editTravelLogForm.route = resultData.route;
            this.editTravelLogForm.description = resultData.description;
          }
        }
      },
      (error: any) => { });
  }

  // Updates the travel log
  EditTravelLog(isValid: any) {
    this.isSubmitted = true;
    console.log('logId:', this.logId);
    if (isValid) {
      this.httpProvider.updateTravelLog(this.logId, this.editTravelLogForm).subscribe(async data => {
        if (data != null && data.body != null) {
            let resultData = data.body;
            if (resultData != null && resultData.isSuccess) {
              if (resultData != null && resultData.isSuccess) {
                // Show success message and navigate to Home after a delay
                this.toastr.success(resultData.message);
                setTimeout(() => {
                  this.router.navigate(['/Home']);
                }, 500);
              }
            }
          }
        },
        async error => {
          // Show error message and navigate to Home after a delay
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }
}

export class travellogForm {
  Id: number | null = null;
  travelDate: string = "";
  vehicleRegistrationNumber: string = "";
  vehicleOwnerName: string = "";
  odometerBefore: number = 0;
  odometerAfter: number = 0;
  route: string = "";
  description: string = "";
}
