import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Ng2SmartTableComponent, ServerDataSource } from 'ng2-smart-table';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bus-routes',
  templateUrl: './bus-routes.component.html',
  styleUrls: ['./bus-routes.component.scss']
})
export class BusRoutesComponent implements OnInit {

  pageSize = 20;
  pageNumber = 1;
  totalRecords = 0;
  listUrl = environment.apiurl + 'v1/bus-routes.php';
  totalRows = 0;
  currentRows = 0;
  source: ServerDataSource;

  @ViewChild('table')
  smartTable: Ng2SmartTableComponent;

  settings = {
    hideSubHeader: false,
    actions: {
      custom: [],
      add: false,
      edit: false,
      delete: false,

    },
    columns: {
      name: {
        title: 'Name',
        type: 'html',
      },
      distance: {
        title: 'Distance',
        type: 'html',
        filter: false,
      },
      fare: {
        title: 'Fare',
        type: 'html',
        filter: false,
      },
      route: {
        title: 'Route',
        type: 'html',
        filter: false,
      },
    },
    mode: 'external',
    pager: {
      display: true,
      perPage: this.pageSize,
    },
  };

  constructor(
    private domSanitizer: DomSanitizer,
    private apiService: ApiService,
    private titleService: Title,
  ) { 
    this.titleService.setTitle('Bus Route');
  }

  ngOnInit(): void {
    this.source = this.getData();
    //console.log(this.source);
    this.source.onChanged().subscribe((change) => {
      if (change.action === 'page') {
        this.pageNumber = change.paging.page;
      }
    });
  }

  getData() {
    return this.apiService.getGridData(this.listUrl, this.pageSize, this.pageNumber);
  }

  ngDoCheck() {
    this.totalRows = this.source != null ? this.source.count() : null;
    if (this.pageNumber * this.pageSize > this.totalRows) {
      this.currentRows = this.totalRows;
    } else {
      this.currentRows = this.pageNumber * this.pageSize;
    }
  }

}
