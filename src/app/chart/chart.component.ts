import { MongoDbService } from '../mongo-db.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  constructor(private mongoService: MongoDbService) {
  }

  chart: Chart;

  messwertMax: number = 0;
  messwertMin: number = 0;
  frameEnde: number = 0;
  frameAnfang: number = 0;
  frameIntervall: number = 0;
  pixelEntfernung: number = 0;
  data = [{
    x: 15,
    y: 10
  }];

  updateVarMesspunktMaxTempChart() {
    this.removeData();
    this.mongoService.getMaxTempFromVariablenMesspunkt(this.frameAnfang, this.frameEnde, this.frameIntervall, this.pixelEntfernung).
      subscribe(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.addData("frame " + data[i].frame, data[i].frame, data[i].temp);
          //console.log("frame:" + data[i].frame);
          //console.log("temp:" + data[i].temp);
        }
      });
  }

  updateMaxChart() {
    this.removeData();
    this.mongoService.getMaxMesswerte(this.frameAnfang, this.frameEnde).
      subscribe(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.addData("frame " + data[i].frame, data[i].frame, data[i].temp);
          //console.log("frame:" + data[i].frame);
          //console.log("temp:" + data[i].temp);
        }
      });
  }

  initChart() {
    this.chart = new Chart('canvas', {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Scatter Dataset',
          data: this.data
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
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      },
    });

  }


  ngOnInit() {
    this.initChart();

  }

  addData(label, x, y) {
    this.chart.data.datasets[0].data.push({ x: x, y: y });
    this.chart.data.datasets[0].backgroundColor = "rgba(255,0,0,1)";
    this.chart.update();
  }

  removeData() {
    this.chart.data.labels.pop();
    this.chart.data.datasets[0].data = [];
    this.chart.data.datasets[0].backgroundColor = [];
    this.chart.update();
  }


}
