import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { OrgChart } from 'd3-org-chart';
import * as d3 from 'd3';
import { d3Values } from './dto';
import { BACKGROUND_URL } from './utils/consts';

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
      .nodeHeight((d) => 250)

      //Largura da caixa
      .nodeWidth((d) => {
        // if (d.depth == 0) return 500;
        return 400;
      })
      .childrenMargin((d) => 50)
      .compactMarginBetween((d) => 35)
      .compactMarginPair((d) => 30)
      .neighbourMargin((a, b) => 20)

      .nodeContent(function (d: d3Values | any, i, arr, state) {
        const imageDiffVert = 25 + 2;

        const testHTML = `
          <div style="
          width:${d.width}px;
          height:${d.height}px;
          padding-top:${imageDiffVert - 2}px;
          padding-left:1px;
          padding-right:1px"
          >              
            <div style="
                font-family: 'Inter', sans-serif;
                background: rgba(51,51,51);
                margin-left:-1px;width:${d.width - 2}px;
                height:${d.height - imageDiffVert}px;
                border-radius:10px;
                border: 1px solid #E4E2E9"
            >

            <img src=" ${
              d.data.imageUrl
            }" style="margin-top:-30px;margin-left:${
          d.width / 2 - 30
        }px;border-radius:100px;width:60px;height:60px;" />

        

            <div style="text-align:center; margin-bottom:10px">
              <div style="color:#ffe600;font-size:16px;font-weight:bold"> 
                ${d.data.pessoa.nome_guerra}
              </div>

              <div>
                <span style="color: #ffffff">${d.data.pessoa.email}</span>
                <div style="font-size:16px;margin-top:4px">
                <div style="color: black">
                  <span style="background: #eae2fd; border-radius: .8rem; padding: .2rem .4rem; line-height: 130%">${
                    d.data.perfil_funcionario.positionName
                  }</span>
                </div>
                  
                </div>
              </div>
           </div> 

              
            <div style="display:flex;padding-left:15px;padding-right:15px;">

                <div style="background: #FFFFFF;
                            box-sizing: .0rem .4rem 1.6rem #eae2fd;
                            border-radius: 0.3rem;
                            line-height: 130%;">
                    <div style="text-align:center"><strong>Perfil do Colaborador</strong></div>

                    <div>
                      Função: ${d.data.perfil_funcionario.nome_perfil} 
                      #${d.data.perfil_funcionario.codigo_perfil}
                    </div>

                    <div>Descrição:${d.data.perfil_funcionario.descricao}</div>
                    <div>Área: ${d.data.perfil_funcionario.area}</div>
                    <div>
                      Escritório de referência: ${
                        d.data.perfil_funcionario.office
                      }
                    </div>
            </div>
        </div>

            </div>
          </div>
      `;

        return testHTML;
      })

      .render();

    const url = BACKGROUND_URL;
    const replaced = url.replace(/(\r\n|\n|\r)/gm, '');
    d3.select('.svg-chart-container').style(
      'background-image',
      `url(${replaced})`
    );
  }
}
