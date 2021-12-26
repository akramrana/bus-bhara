import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeIndexComponent } from './home-index/home-index.component';
import { CalculateRentComponent } from './calculate-rent/calculate-rent.component';
import { BusRoutesComponent } from './bus-routes/bus-routes.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocalBusListComponent } from './local-bus-list/local-bus-list.component';


@NgModule({
  declarations: [HomeIndexComponent, CalculateRentComponent, BusRoutesComponent, FeedbackComponent, LocalBusListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
  ]
})
export class HomeModule { }
