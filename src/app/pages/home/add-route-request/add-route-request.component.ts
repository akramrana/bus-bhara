import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { first } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-route-request',
  templateUrl: './add-route-request.component.html',
  styleUrls: ['./add-route-request.component.scss']
})
export class AddRouteRequestComponent implements OnInit {

  title: string;
  formGroup: FormGroup;
  token: string | undefined;
  public log: string[] = [];

  constructor(
    private apiService: ApiService,
    private titleService: Title,
    private fb: FormBuilder,
  ) {
    this.titleService.setTitle('Add Route Request');
    this.token = undefined;
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      route: [null, Validators.required],
      fromName: [null, Validators.required],
      toName: [null, Validators.required],
      distance: [null, Validators.required],
      fare: [null, Validators.required],
      contactInfo: [null, Validators.required],
      recaptchaReactive: [null, Validators.required],
    });
  }

  submit() {
    Object.keys(this.formGroup.controls).forEach(field => {
      const control = this.formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (this.formGroup.valid) {
      try {
        const postParams = this.formGroup.value;
        this.apiService.addRouteRequest(postParams)
          .pipe(first())
          .subscribe(response => {
            console.log(response);
          });
      } catch (e) {
        console.log(e);
      }
    }
  }

  addTokenLog(message: string, token: string | null) {
    this.log.push(`${message}: ${this.formatToken(token)}`);
  }

  public formatToken(token: string | null) {
    return token !== null
      ? `${token.substr(0, 7)}...${token.substr(-7)}`
      : 'null';
  }
}
