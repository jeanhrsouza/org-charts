import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as d3 from 'd3';
import { D3OrgChartComponent } from './d3-org-chart/d3-org-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, D3OrgChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  data!: any;

  constructor() {}

  ngOnInit() {
    // d3.csv(
    //   'https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv'
    // ).then((data: any) => {
    //   this.data = data;
    // });
    let project = 'projectX';
    d3.json(`http://localhost:3000/${project}`).then((data: any) => {
      this.data = data.orgChart;
    });
  }
}
