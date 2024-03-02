import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { OrgChart } from 'd3-org-chart';
import * as d3 from 'd3';
import { d3Values } from './dto';

@Component({
  selector: 'app-d3-org-chart',
  standalone: true,
  imports: [],
  templateUrl: './d3-org-chart.component.html',
  styleUrl: './d3-org-chart.component.scss',
})
export class D3OrgChartComponent {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  @Input() data!: any[];
  chart: any;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (!this.chart) {
      this.chart = new OrgChart();
    }
    this.updateChart();
  }

  ngOnChanges() {
    this.updateChart();
    console.log(this.data);
  }
  updateChart() {
    if (!this.data) {
      return;
    }
    if (!this.chart) {
      return;
    }
    this.chart
      .container(this.chartContainer.nativeElement)
      .data(this.data)

      //Altura da caixa
      .nodeHeight((d) => 170)

      //Largura da caixa
      .nodeWidth((d) => {
        // if (d.depth == 0) return 500;
        return 330;
      })
      .childrenMargin((d) => 50)
      .compactMarginBetween((d) => 35)
      .compactMarginPair((d) => 30)
      .neighbourMargin((a, b) => 20)

      .nodeContent(function (d: d3Values | any, i, arr, state) {
        const svgStr = `<svg width=150 height=75  style="background-color:none"> <path d="M 0,15 L15,0 L135,0 L150,15 L150,60 L135,75 L15,75 L0,60" fill="#2599DD" stroke="#2599DD"/> </svg>`;

        const color = '#acacacac';
        const imageDiffVert = 25 + 2;
        return `                
          <div style="
            width:${d.width}px;
            height:${d.height}px;
            padding-top:${imageDiffVert - 2}px;
            padding-left:1px;
            padding-right:1px"
          >

          <div style="
              font-family: 'Inter', sans-serif;
              background-color:${color};
              margin-left:-1px;width:${d.width - 2}px;
              height:${d.height - imageDiffVert}px;
              border-radius:10px;
              border: 1px solid #E4E2E9"
          >
            <div style="
                display: flex;
                justify-content: flex-end;
                margin-top: 5px;
                margin-right: 8px;
              "
            >
              #${d.data.id}
            </div>

            <div
              style="background-color:${color};margin-top:${-imageDiffVert - 20}px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;"
            ></div>

            <div style="margin-top:${-imageDiffVert - 20}px;">
              <img
                src=" ${d.data.imageUrl}"
                style="margin-left:${20}px;border-radius:100px;width:40px;height:40px;"
              />
            </div>

            <div
              style="
                font-size: 15px;
                color: #08011e;
                margin-left: 20px;
                margin-top: 10px;
              "
            >
              ${d.data.pessoa.nome_guerra}
            </div>

            <div
              style="
                color: #716e7b;
                margin-left: 20px;
                margin-top: 3px;
                font-size: 10px;
              "
            >
              ${d.data.perfil_funcionario.positionName}
            </div>
          </div>
          </div>

                            `;
      })

      .render();
  }
}
