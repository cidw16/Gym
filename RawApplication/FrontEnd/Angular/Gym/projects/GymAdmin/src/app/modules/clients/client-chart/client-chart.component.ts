import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'gym-client-chart',
  templateUrl: './client-chart.component.html',
  styleUrls: ['./client-chart.component.scss']
})
export class ClientChartComponent implements OnInit {

  public name:string;
  myType = 'LineChart';
  myData = [
      ['2020-09-01', 10, 12],
      ['2020-09-02', 15, 13],
      ['2020-09-03', 13, 23],
      ['2020-09-03', 13, 34]
  ];
  chartColumns = ['Date', 'Weight', 'Biceps'];
  title = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['clientName'];
    });
  }

}
