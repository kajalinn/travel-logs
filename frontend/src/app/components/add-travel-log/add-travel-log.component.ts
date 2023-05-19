import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {HttpProviderService} from "../../service/http-provider.service";

@Component({
  selector: 'app-add-travel-log',
  templateUrl: './add-travel-log.component.html',
  styleUrls: ['./add-travel-log.component.scss']
})
export class AddTravelLogComponent implements OnInit {
  addTravelLogForm: travelLogForm = new travelLogForm();

  @ViewChild("travelLogForm")
  travelLogForm!: NgForm;
  isSubmitted: boolean = false;
  constructor(private router: Router, private httpProvider: HttpProviderService, private toastr: ToastrService) { }

  ngOnInit(): void {  }

  AddTravelLog(isValid: any) {
    this.isSubmitted = true;
    if (isValid) {
      this.httpProvider.saveTravelLog(this.addTravelLogForm).subscribe(async data => {
            if (data != null && data.body != null) {
              let resultData = data.body;
              console.log("Result data" ,resultData);
              if (resultData != null) {
                this.toastr.success(resultData.message);
                setTimeout(() => {
                  this.router.navigate(['/Home']);
                }, 500);
              }
            }

        },
        async error => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
          }, 500);
        });
    }
  }
}

export class travelLogForm {
  travelDate: string = "";
  vehicleRegistrationNumber: string = "";
  vehicleOwnerName: string = "";
  odometerBefore: number = 0;
  odometerAfter: number = 0;
  route: string = "";
  description: string = "";
}
