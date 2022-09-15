import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ExportDemoService {
  private token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzA2MmVkZWZhODlkODIyYzhjZGU2M2YiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY2MTk2MDE3NywiZXhwIjoxNjYyNTY0OTc3fQ.AHRhytXnDPJ8bl4K5zvTrysUYg6-Ws2jC3xbuvBfr0k";

  API_URL = 'http://192.168.56.1:8181/api/'

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+this.token,
    'Access-Control-Allow-Origin': ''
  })

  private options = {
    headers: this.headers
  }

  constructor(private http: HttpClient,) { }

  setRestaurantSettingFromExcel(data : any,restaurantID:string):Observable<any>{
    return this.http.post<any>(`${this.API_URL}onboarding/${restaurantID}`,data,this.options)
  }
}
