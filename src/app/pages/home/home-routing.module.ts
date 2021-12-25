import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusRoutesComponent } from './bus-routes/bus-routes.component';
import { CalculateRentComponent } from './calculate-rent/calculate-rent.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { HomeIndexComponent } from './home-index/home-index.component';

const routes: Routes = [
  {
    path: '',
    component: HomeIndexComponent,
    children: [
      {
        path: 'index',
        component: HomeIndexComponent,
      },
    ],
  },
  {
    path: 'calculate-rent',
    component: CalculateRentComponent,
  },
  {
    path: 'feedback',
    component: FeedbackComponent,
  },
  {
    path: 'bus-routes',
    component: BusRoutesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
