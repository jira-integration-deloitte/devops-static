import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DevopsHttpService {

  constructor(private http: HttpClient) {}

  getData(url) {
    return this.http.get(url);
  }

  postData(url, data) {
    return this.http.post(url, data);
  }
}
