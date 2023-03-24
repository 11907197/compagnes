import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnnexeService {

  constructor(private http: HttpClient) { }

  // get list brands
  getBrandsList(): Observable<any> {
    return this.http.get('assets/brands.json');
  }
   // get list mediax
   getMediasList(): Observable<any> {
    return this.http.get('assets/media.json');
  }
}
