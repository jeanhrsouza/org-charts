import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { D3OrgChartComponent } from './d3-org-chart/d3-org-chart.component';

@NgModule({
  declarations: [D3OrgChartComponent],
  imports: [CommonModule, HttpClientModule, BrowserModule],
})
export class AppModule {}
