import {IchartData} from './ichart-data';
import {Idatabase} from './idatabase';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class MongoDbService {

  //url="http://10.81.41.71:8080";
  url="http://127.0.0.1:8080";

  constructor(private http: HttpClient) {}

  getMaxTempFromVariablenMesspunkt(collection?:string, frameAnfang?: number, frameEnde?: number, frameIntervall?: number, pixelEntfernung?: number): Observable<IchartData[]> {
    let url = this.url+'/api/getMaxTempFromVariablenMesspunkt/?collection='+collection+'&frameAnfang='
      + frameAnfang + '&frameEnde=' + frameEnde + '&frameIntervall='+frameIntervall+'&pixelEntfernung='+pixelEntfernung;
    console.log(url);

    return this.http.get<IchartData[]>(url);
  }

  getCollections(): Observable<Idatabase[]> {
    let url = this.url+'/api/getCollections';
    console.log(url);
    
    return this.http.get<Idatabase[]>(url);
  }

}
