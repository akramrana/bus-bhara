import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ServerDataSource } from 'ng2-smart-table';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseRoute = 'v1';

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

  getBusStops(getParams?: any) {
    return this.configService.readRequest(this.baseRoute + '/bus-stops.php', getParams)
      .pipe(map(response => {
        return response;
      }));
  }

  searchBusStops(getParams?: any) {
    return this.configService.readRequest(this.baseRoute + '/search-stops.php', getParams)
      .pipe(map(response => {
        return response;
      }));
  }

  searchDestinationStops(getParams?: any) {
    return this.configService.readRequest(this.baseRoute + '/destination-stops.php', getParams)
      .pipe(map(response => {
        return response;
      }));
  }

  searchFare(postParams?: any) {
    return this.configService.postRequest(this.baseRoute + '/calculate-fare.php', {}, postParams)
      .pipe(map(response => {
        return response;
      }));
  }

  getGridData(listUrl, pageSize, pageNumber) {
    return new ServerDataSource(this.http,
      {
        dataKey: 'list',
        endPoint: listUrl,
        totalKey: 'count'
      });
  }

}
