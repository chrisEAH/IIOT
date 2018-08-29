import {IdbEntry} from './idbentry';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class MongoDbService {

  constructor(private http: HttpClient) {}

  getMesswerte(datumMin?: number, datumMax?: number, messwertMin?: number, messwertMax?: number): Observable<IdbEntry[]> {
    return this.http.get<IdbEntry[]>('http://localhost:8081/api/getMesswerte/?minDate='
      + datumMin + '?maxDate=' + datumMax + '?maxValue=' + messwertMax + '?minValue='
      + messwertMin);
  }

}
