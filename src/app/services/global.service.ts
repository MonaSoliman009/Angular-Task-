import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private http: HttpClient) { }
  public getEURtoUSD(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/latest?access_key=${environment.apiKey}`).pipe(map(res => res));
  }
  public converter(from:string, to:string,amount:number): Observable<any> {
    return this.http.get(`${environment.baseUrl}/convert?access_key=${environment.apiKey}&base=${from}&symbols =${to},JPY,GBP,AUD,CAD,CHF,CNH,HKD,NZD&amount=${amount}`).pipe(map(res => res));
  }
  public availableCurrencies(): Observable<any> {
    return this.http.get(`${environment.baseUrl}/symbols?access_key=${environment.apiKey}`).pipe(map(res => res));
  }
}
