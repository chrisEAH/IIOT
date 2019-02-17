import { Chart } from 'chart.js';
import { ChartComponent } from './chart.component';

export class MyChart extends Chart
{
    constructor(type, options)
    {
        super(type, options);

        options=this.options;
        
        options.tooltips={
            // Disable the on-canvas tooltip
            enabled: true,
            custom:function(tooltipModel) {      
              if(tooltipModel.dataPoints!=undefined)
              {
                console.log(document.getElementById("canvasPosition"));
                
                
                //postitionChart.data.datasets[0].pointBackgroundColor[tooltipModel.dataPoints[0].index] = this.colorSelect;
                
                //this.postitionChart.update();
              }
            }
        };
    }

    options;
    data=this.data;
    update=this.update;
    
    postitionChart:Chart;

    

    
}