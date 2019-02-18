import {Iserie} from './chart/iserie';
import {Idatabase} from '../app/entities/IDatabase';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class MongoDbService {

  constructor(private http: HttpClient) {}

  getMaxTempFromVariablenMesspunkt(collection?:string, frameAnfang?: number, frameEnde?: number, frameIntervall?: number, pixelEntfernung?: number): Observable<Iserie[]> {
    let url = 'http://127.0.0.1:8081/api/getMaxTempFromVariablenMesspunkt/?collection='+collection+'&frameAnfang='
      + frameAnfang + '&frameEnde=' + frameEnde + '&frameIntervall='+frameIntervall+'&pixelEntfernung='+pixelEntfernung;
    console.log(url);

    return this.http.get<Iserie[]>(url);
  }

  getCollections(): Observable<Idatabase[]> {
    let url = 'http://127.0.0.1:8081/api/getCollections';
    console.log(url);

    return this.http.get<Idatabase[]>(url);
  }

}
