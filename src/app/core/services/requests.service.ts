import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  // get list requests
  getRequestsList(): Observable<any> {
    return this.http.get('assets/payload-rmp.json');
  }
}
