import { Component, OnInit } from '@angular/core';
import {MongoDbService} from '../mongo-db.service';
import {Idatabase} from '../entities/idatabase';
import {ChartComponent} from '../chart/chart.component';

/*
@Component({
  selector: 'app-chart-settings',
  templateUrl: './chart-settings.component.html',
  styleUrls: ['./chart-settings.component.css']
})
export class ChartSettingsComponent{

  databases: Idatabase[];
  selected:string;
  dataExchangeService:ChartComponent;

  frameEnde: number = 0;
  frameAnfang: number = 0;
  frameIntervall: number = 0;
  pixelEntfernung: number = 0;


  constructor(private mongoService: MongoDbService) {
    this.searchDatabases(mongoService);
  }

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

  searchDatabases(mongoService: MongoDbService) {
    mongoService.getDatabases().subscribe(data => {
      this.databases = data;
    });
  }

}*/
