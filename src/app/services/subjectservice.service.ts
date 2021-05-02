import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  orderscountsubject = new Subject();
  orderscountasobserv = this.orderscountsubject.asObservable();
  constructor() { }


setorderscount(data)
{
  this.orderscountsubject.next(data)
}

}
