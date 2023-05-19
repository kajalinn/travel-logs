import { Component, Input, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
// @ts-ignore
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// @ts-ignore
import { ToastrService } from 'ngx-toastr';
import {HttpProviderService} from "../../service/http-provider.service";
import {travelLogForm} from "../add-travel-log/add-travel-log.component";

@Component({
  selector: 'ng-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
    <button type="button" class="btn close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">×</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete?</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">CANCEL</button>
    <button type="button" ngbAutofocus class="btn btn-success" (click)="modal.close('Ok click')">OK</button>
  </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) { }
}
const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  closeResult = '';
  travelLogList: any = [];
  constructor(private router: Router, private modalService: NgbModal,
              private toastr: ToastrService, private httpProvider : HttpProviderService) { }

  ngOnInit(): void {
    this.getAllTravelLogs();
  }
  async getAllTravelLogs() {
    this.httpProvider.getAllTravelLogs().subscribe({
      next: (data: any) => {
        console.log("Home component data ->", data);
        if(data){
          this.travelLogList = data;
        }
      },
      error: (error: any) => {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.travelLogList = [];
            }
          }
        }
      }
    });
  }

  AddTravelLog() {
    this.router.navigate(['AddTravelLog']);
  }

  deleteTravelLogConfirmation(travellog: any) {
    this.modalService.open(MODALS['deleteModal'],
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then((result: any) => {
        this.deleteTravelLog(travellog);
      },
      (reason: any) => {});
  }

  deleteTravelLog(travellog: any) {
    this.httpProvider.deleteTravelLogById(travellog.id).subscribe((data : any) => {
        if (data != null && data.body != null) {
          let resultData = data.body;
          if (resultData != null && resultData.isSuccess) {
            this.toastr.success(resultData.message);
            this.getAllTravelLogs();
          }
        }
      },
      (error : any) => {});
  }
}
