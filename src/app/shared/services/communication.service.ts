import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { budget } from 'src/app/add-form/form.model';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
public data:Subject<any>;
public patchValue:Subject<any>;
public totalBalance:Subject<any>
  constructor() {
    this.data=new Subject;
    this.patchValue=new Subject;
    this.totalBalance=new Subject;
   }
}
