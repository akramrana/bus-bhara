import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.scss']
})
export class HomeIndexComponent implements OnInit {

  constructor(
    private titleService: Title,
  ) { 
    this.titleService.setTitle('Home');
  }

  ngOnInit(): void {
  }

}
