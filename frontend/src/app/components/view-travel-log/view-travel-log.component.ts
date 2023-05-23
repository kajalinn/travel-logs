import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProviderService } from "../../service/http-provider.service";
import { WebApiService } from "../../service/web-api.service";


@Component({
  selector: 'app-view-travel-log',
  templateUrl: './view-travel-log.component.html',
  styleUrls: ['./view-travel-log.component.scss']
})
export class ViewTravelLogComponent implements OnInit {

  logId: any;
  travellogDetail : any= [];

  constructor(public webApiService: WebApiService, private route: ActivatedRoute, private httpProvider : HttpProviderService) { }

  ngOnInit(): void {
    this.logId = Number(this.route.snapshot.params['logId']);
    this.getTravelLogById();
  }

  // Fetches the travel log by ID
  getTravelLogById() {
    this.httpProvider.getTravelLogById(this.logId).subscribe((data : any) => {
      if(data){
        console.log(data);
      }
      if (data != null) {
          let resultData = data;
          if (resultData) {
            this.travellogDetail = resultData;
          }
        }
      },
      (error :any)=> { });
  }

}
