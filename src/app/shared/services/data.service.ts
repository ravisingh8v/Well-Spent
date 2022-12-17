import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { budget } from 'src/app/add-form/form.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:3000/budget';
  }

  getData(): Observable<budget> {
    return this.http.get<budget>(this.baseUrl)
  }
  postData(data: any): Observable<budget> {
    return this.http.post<budget>(this.baseUrl, data)
  }
  deleteData(id: number) {
    const url=`http://localhost:3000/budget/${id}`
    return this.http.delete(url)
  }
  editData(id:number,data:any){
    const url=`http://localhost:3000/budget/${id}`
    return this.http.put(url,data)
  }
}
