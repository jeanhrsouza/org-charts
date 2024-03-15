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
        const color = '#D3D0CB';
        const imageDiffVert = 25 + 2;

        const originalHTML = `
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
              style="background-color:${color};margin-top:${
          -imageDiffVert - 20
        }px;margin-left:${15}px;border-radius:100px;width:50px;height:50px;"
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

        const svgStr = `<svg width=150 height=75  style="background-color:none"> <path d="M 0,15 L15,0 L135,0 L150,15 L150,60 L135,75 L15,75 L0,60" fill="#2599DD" stroke="#2599DD"/> </svg>`;
        const futuristicChart = `
        <div class="left-top" style="position:absolute;left:-10px;top:-10px">  ${svgStr}</div>
        <div class="right-top" style="position:absolute;right:-10px;top:-10px">  ${svgStr}</div>
        <div class="right-bottom" style="position:absolute;right:-10px;bottom:-14px">  ${svgStr}</div>
        <div class="left-bottom" style="position:absolute;left:-10px;bottom:-14px">  ${svgStr}</div>
        <div style="font-family: 'Inter'; background-color:#040910;sans-serif; position:absolute;margin-top:-1px; margin-left:-1px;width:${
          d.width
        }px;height:${d.height}px;border-radius:0px;border: 2px solid #2CAAE5">
        
           
           <div class="pie-chart-wrapper" style="margin-left:-10px;margin-top:5px;width:320px;height:300px"></div>
         
          <div style="color:#2CAAE5;position:absolute;right:15px;top:-20px;">
            <div style="font-size:15px;color:#2CAAE5;margin-top:32px"> ${
              d.data.name
            } </div>
            <div style="font-size:10px;"> ${d.data.positionName || ''} </div>
            <div style="font-size:10px;"> ${d.data.id || ''} </div>
            ${
              d.depth == 0
                ? `                              <br/>
            <div style="max-width:200px;font-size:10px;">
              A corporate history of Ian is a chronological account of a business or other co-operative organization he founded.  <br><br>Usually it is produced in written format but it can also be done in audio or audiovisually  
            </div>`
                : ''
            }

          </div>

          
        
`;
        const cardchart = `
        <div style="padding-top:30px;background-color:none;margin-left:1px;height:${
          d.height
        }px;border-radius:2px;overflow:visible">
          <div style="height:${
            d.height - 32
          }px;padding-top:0px;background-color:white;border:1px solid lightgray;">

            <img src=" ${
              d.data.imageUrl
            }" style="margin-top:-30px;margin-left:${
          d.width / 2 - 30
        }px;border-radius:100px;width:60px;height:60px;" />

           <div style="margin-right:10px;margin-top:15px;float:right">${
             d.data.id
           }</div>
           
           <div style="margin-top:-30px;background-color:#3AB6E3;height:10px;width:${
             d.width - 2
           }px;border-radius:1px"></div>

           <div style="padding:20px; padding-top:35px;text-align:center">
               <div style="color:#111672;font-size:16px;font-weight:bold"> ${
                 d.data.name
               } </div>
               <div style="color:#404040;font-size:16px;margin-top:4px"> ${
                 d.data.positionName
               } </div>
           </div> 
           <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
             <div > Manages:  ${d.data._directSubordinates} 👤</div>  
             <div > Oversees: ${d.data._totalSubordinates} 👤</div>    
           </div>
          </div>     
  </div>
`;

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
  }
}
