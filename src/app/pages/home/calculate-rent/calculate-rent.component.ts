import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-calculate-rent',
  templateUrl: './calculate-rent.component.html',
  styleUrls: ['./calculate-rent.component.scss']
})
export class CalculateRentComponent implements OnInit {

  title: string;
  formGroup: FormGroup;
  departureStops: any[];
  destinationStops: any[];
  fareCalcResults: any[];

  constructor(
    private apiService: ApiService,
    private titleService: Title,
    private fb: FormBuilder,
  ) {
    this.titleService.setTitle('Calculate Fare');
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      departure: [null, Validators.required],
      destination: [null, Validators.required],
    });
  }

  search() {
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (this.formGroup.valid) {
      try {
        const postParams = this.formGroup.value;
        this.apiService.searchFare(postParams)
          .pipe(first())
          .subscribe(response => {
            //console.log(response);
            if (Object.keys(response).length) {
              this.fareCalcResults = response;
            }else{
              alert('Sorry no result found. Please try another combination');
            }
          });
      } catch (e) {
        console.log(e);
      }
    }
  }

  getDestination() {
    this.formGroup.patchValue({
      destination: ""
    });
    this.destinationStops = [];
    let departure = this.formGroup.get('departure').value;
    this.apiService.searchDestinationStops({ keyword: departure })
      .subscribe(response => {
        //console.log(result);
        if (response) {
          const result = response.body;
          this.destinationStops = result.destinations;
        }
      });
  }

  searchStops(event) {
    let searchValue = event.term;
    this.formGroup.patchValue({
      destination: ""
    });
    if (searchValue) {
      this.departureStops = [];
      this.destinationStops = [];
      this.apiService.searchBusStops({ keyword: searchValue })
        .subscribe(response => {
          //console.log(result);
          if (response) {
            const result = response.body;
            this.departureStops = result.departures;
          }
        });
    }
  }
}
