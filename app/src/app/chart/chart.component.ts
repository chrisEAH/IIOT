import { MongoDbService } from '../mongo-db.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Idatabase } from '../idatabase';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})


export class ChartComponent implements OnInit {
  constructor(private mongoService: MongoDbService) {
    this.searchDatabases(mongoService);
  }

  ngOnInit() {
    this.initChart();
  }

  chartTemp: Chart;
  chartPosition: Chart;

  databases: Idatabase[];

  dbSelected: Idatabase;

  selectedDataPointBufferTemp=0;
  selectedDataPointBufferPosition=0;

  
  frameEnde: number=0;
  frameAnfang: number = 0;
  frameMax:number=0;
  frameIntervall: number = 0;

  pixelEntfernung: String = "0";
  maszstab:String="1";

  data = [
    {
      x: 15,
      y: 10,
      frame: 1
    },
  ];

  colorSelect = "#FF0000";
  colorUnselect = "#00FF00";

  color = [
    "colorUnselect",
  ];

  initChart() {
    this.chartTemp = new Chart('canvasTemp', {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Temperatur',
          data:[ this.data],
          pointBackgroundColor: this.color
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Frame'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Temperatur'
            }
          }]
        },
        tooltips:{
          enabled: true,
          custom:(tooltipModel)=> {      
            if(tooltipModel.dataPoints!=undefined)
            {
              this.chartPosition.data.datasets[0].pointBackgroundColor[this.selectedDataPointBufferTemp] = this.colorUnselect;
              this.chartPosition.update();

              this.selectedDataPointBufferTemp=tooltipModel.dataPoints[0].index;
              this.chartPosition.data.datasets[0].pointBackgroundColor[this.selectedDataPointBufferTemp] = this.colorSelect;
              this.chartPosition.update();
            }
          }
        }
      },
    });

    this.chartPosition = new Chart('canvasPosition', {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Position',
          data: this.data,
          pointBackgroundColor: this.color
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'X in mm'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Y in mm'
            }
          }]
        },
        tooltips:{
          enabled: true,
          custom:(tooltipModel)=> {      
            if(tooltipModel.dataPoints!=undefined)
            {
              this.chartTemp.data.datasets[0].pointBackgroundColor[this.selectedDataPointBufferPosition] = this.colorUnselect;
              this.chartTemp.update();

              this.selectedDataPointBufferPosition=tooltipModel.dataPoints[0].index;
              this.chartTemp.data.datasets[0].pointBackgroundColor[this.selectedDataPointBufferPosition] = this.colorSelect;
              this.chartTemp.update();
            }
          }
        }
      },
    });
  }

  updateVarMesspunktMaxTempChart() {
    this.cleanCharts();
    console.log(this.dbSelected);
    this.mongoService.getMaxTempFromVariablenMesspunkt(this.dbSelected.name, this.frameAnfang, this.frameEnde, this.frameIntervall, Number(this.pixelEntfernung.replace(/,/g, '.'))/Number(this.maszstab.replace(/,/g, '.'))).
      subscribe(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.addDataToChart(data[i].frame, data[i].temp, data[i].x, data[i].y);
        }
      });
  }

  addDataToChart(frame, temp, x, y) {
    this.chartTemp.data.datasets[0].data.push({ x: frame, y: temp });
    this.chartTemp.data.datasets[0].pointBackgroundColor.push(this.colorUnselect);
    this.chartTemp.update();

    this.chartPosition.data.datasets[0].data.push({ x: x*Number(this.maszstab.replace(/,/g, '.')), y: y*Number(this.maszstab.replace(/,/g, '.')), frame: frame });
    this.chartPosition.data.datasets[0].pointBackgroundColor.push(this.colorUnselect);
    this.chartPosition.update();
  }

  cleanCharts() {
    this.chartTemp.data.datasets[0].data = [];
    this.chartTemp.data.datasets[0].pointBackgroundColor = [];
    this.chartTemp.update();

    this.chartPosition.data.datasets[0].data = [];
    this.chartPosition.data.datasets[0].pointBackgroundColor = [];
    this.chartPosition.update();
  }


  searchDatabases(mongoService: MongoDbService) {
    mongoService.getCollections().subscribe(data => {
      console.log(data);
      this.databases = data;
    });
  }

  /*changeColor(index) {
    this.chartPosition.data.datasets[0].pointBackgroundColor[index] = this.colorSelect;
    this.chartPosition.update();
  }*/

  setMaxFrame(db: Idatabase)
  {
    console.log((db));
    this.frameMax=db.anzahl;
    this.frameEnde=db.anzahl;
  }

  proofInput(i:number)
  {
    if(i>this.frameMax)
    {
      this.frameEnde=this.frameMax;
    }

    if(i<0)
    {
      this.frameAnfang=0;
    }
  }

}
