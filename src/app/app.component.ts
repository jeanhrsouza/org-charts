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
    let project = 'projectX';
    d3.json(`http://localhost:3000/${project}`).then((data: any) => {
      this.data = data.orgChart;
    });
  }
}
