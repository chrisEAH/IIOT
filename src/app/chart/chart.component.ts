import {MongoDbService} from '../mongo-db.service';
import {Iserie} from './iserie';
import {Component, OnInit} from '@angular/core';
import {Chart} from 'angular-highcharts';
import {SeriesChart} from 'highcharts';
import {AxisOptions} from 'highcharts/highstock';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  constructor(private mongoService: MongoDbService) {
  }

  values = new Array<Number>();

  chartOpt = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: []
    }
  };

  chart: Chart;

  serie = {
    name: 'mongoDb',
    data: []
  };

  messwertMax: number = 0;
  messwertMin: number = 0;
  datumMax: number = 0;
  datumMin: number = 0;


  drawChart() {
    this.mongoService.getMesswerte(this.datumMin, this.datumMax, this.messwertMin, this.messwertMax).
      subscribe(data => {
        //console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.values.push(data[i].value);
          this.chartOpt.xAxis.categories.push(data[i].timeStamp);
        }
        this.serie['data'] = this.values;
        this.chart = new Chart(this.chartOpt);

        this.chart.addSerie(this.serie, true, false);
      });

  }

  updateBtn() {
    this.chart.removeSerie(0);
    this.values = [];
    this.drawChart();
  }

  ngOnInit() {
    this.drawChart();
  }
}
