import {Iserie} from './chart/iserie';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class MongoDbService {

  constructor(private http: HttpClient) {}

  values;

  getMaxMesswerte(frameAnfang?: number, frameEnde?: number): Observable<Iserie[]> {
    let url = 'http://localhost:8081/api/getMax/?frameAnfang='
      + frameAnfang + '&frameEnde=' + frameEnde;
    console.log(url);

    return this.http.get<Iserie[]>(url);
  }

  getMaxTempFromVariablenMesspunkt(frameAnfang?: number, frameEnde?: number, frameIntervall?: number, pixelEntfernung?: number): Observable<Iserie[]> {
    let url = 'http://localhost:8081/api/getMaxTempFromVariablenMesspunkt/?frameAnfang='
      + frameAnfang + '&frameEnde=' + frameEnde + '&frameIntervall='+frameIntervall+'&pixelEntfernung='+pixelEntfernung;
    console.log(url);

    return this.http.get<Iserie[]>(url);
  }

}
