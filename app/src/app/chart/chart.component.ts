import { MongoDbService } from '../mongo-db.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Idatabase } from '../entities/idatabase';
import { EventEmitter } from 'events';


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

  dbSelected: string = '';

  selectedDataPointBuffer=0;

  messwertMax: number = 0;
  messwertMin: number = 0;
  frameEnde: number = 0;
  frameAnfang: number = 0;
  frameIntervall: number = 0;
  pixelEntfernung: number = 0;
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

  responsive=false;



  initChart() {
    this.chartTemp = new Chart('canvasTemp', {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Temperatur',
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
              this.chartPosition.data.datasets[0].pointBackgroundColor[this.selectedDataPointBuffer] = this.colorUnselect;
              this.chartPosition.update();

              this.selectedDataPointBuffer=tooltipModel.dataPoints[0].index;
              this.chartPosition.data.datasets[0].pointBackgroundColor[this.selectedDataPointBuffer] = this.colorSelect;
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
              labelString: 'X'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Y'
            }
          }]
        },
        tooltips:{
          enabled: true,
          custom:(tooltipModel)=> {      
            if(tooltipModel.dataPoints!=undefined)
            {

              this.chartPosition.data.datasets[0].pointBackgroundColor[tooltipModel.dataPoints[0].index] = this.colorSelect;
              this.chartPosition.update();
            }
          }
        }
      },
    });
  }



  updateVarMesspunktMaxTempChart() {
    this.removeDataTemp();
    this.mongoService.getMaxTempFromVariablenMesspunkt(this.dbSelected, this.frameAnfang, this.frameEnde, this.frameIntervall, this.pixelEntfernung).
      subscribe(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.addDataTemp(data[i].frame, data[i].temp, data[i].x, data[i].y);
          //this.addDataPosition(, data[i].frame);
        }
      });
  }

  updateMaxChart() {
    this.removeDataTemp();
    this.mongoService.getMaxMesswerte(this.dbSelected, this.frameAnfang, this.frameEnde).
      subscribe(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.addDataTemp(data[i].frame, data[i].temp, data[i].x, data[i].y);
        }
      });
  }

  addDataTemp(frame, temp, x, y) {
    this.chartTemp.data.datasets[0].data.push({ x: frame, y: temp });
    this.chartTemp.data.datasets[0].pointBackgroundColor.push(this.colorUnselect);

    this.chartTemp.update();

    this.chartPosition.data.datasets[0].data.push({ x: x, y: y, frame: frame });
    this.chartPosition.data.datasets[0].pointBackgroundColor.push(this.colorUnselect);

    this.chartPosition.update();
  }

  removeDataTemp() {
    this.chartTemp.data.datasets[0].data = [];
    this.chartTemp.data.datasets[0].pointBackgroundColor = [];
    this.chartTemp.update();

    this.chartPosition.data.datasets[0].data = [];
    this.chartPosition.data.datasets[0].pointBackgroundColor = [];
    this.chartPosition.update();
  }


  searchDatabases(mongoService: MongoDbService) {
    mongoService.getCollections().subscribe(data => {
      this.databases = data;
    });
  }

  changeColor(index) {
    this.chartPosition.data.datasets[0].pointBackgroundColor[index] = this.colorSelect;
    this.chartPosition.update();
  }

}
