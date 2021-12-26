import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { Ng2SmartTableComponent, ServerDataSource } from 'ng2-smart-table';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-local-bus-list',
  templateUrl: './local-bus-list.component.html',
  styleUrls: ['./local-bus-list.component.scss']
})
export class LocalBusListComponent implements OnInit {

  pageSize = 20;
  pageNumber = 1;
  totalRecords = 0;
  listUrl = environment.apiurl + 'v1/local-bus-list.php';
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
      busName: {
        title: 'Bus Name',
        type: 'html',
      },
      routes: {
        title: 'Routes',
        type: 'html',
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
    this.titleService.setTitle('Local Bus List');
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
