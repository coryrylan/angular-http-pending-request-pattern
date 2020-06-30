import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, defer } from 'rxjs';
import { catchError, tap, retry, delay } from 'rxjs/operators';

export interface User {
  name: string;
  height: number;
  mass: string;
  homeworld: string;
}

export interface Pending<T> {
  data: Observable<T>;
  status: Observable<Status>;
}

export enum Status {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private ngZone: NgZone) {}

  load(userId: number): Pending<User> {
    const status = new ReplaySubject<Status>();

    const request = this.http
      .get<User>(`https://swapi.co/api/people/${userId}`)
      .pipe(
        delay(2000), // artificial delay
        retry(2),
        catchError(error => {
          status.next(Status.ERROR);
          throw 'error loading user';
        }),
        tap(() => status.next(Status.SUCCESS))
      );

    const data = defer(() => {
      status.next(Status.LOADING);
      return request;
    });

    return { data, status };
  }
}
