import {MongoDbService} from '../mongo-db.service';
import {Iserie} from './iserie';
import {Component, OnInit} from '@angular/core';
import {Chart} from 'angular-highcharts';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  constructor(private mongoService: MongoDbService) {
  }

  values = new Array<Number>();

  chart: Chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Linechart'
    },
    credits: {
      enabled: false
    }
  });

  serie = {
    name: 'mongoDb',
    data: []
  };

  drawChart(): void {
    this.mongoService.getMesswerte().
      subscribe(data => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.values.push(data[i].value);
        }

        this.serie['data'] = this.values;
        this.chart.addSerie(this.serie, true, false);
      });

  }

  ngOnInit() {
    this.drawChart();
  }
}
