import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StateService {

 private _count = new BehaviorSubject<number>(0);

  get count$() {
    return this._count.asObservable();
  }

  increment() {
    this._count.next(this._count.value + 1);
  }

  decrement() {
    this._count.next(this._count.value - 1);
  }
  
}