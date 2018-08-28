import {IdbEntry} from './idbentry';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class MongoDbService {

  constructor(private http: HttpClient) {}

  getMesswerte(): Observable<IdbEntry[]> {
    let entries = this.http.get<IdbEntry[]>('http://localhost:8081/api/getMesswerte/');
    console.log(entries);
    console.log(entries);
    return entries;
  }

}
