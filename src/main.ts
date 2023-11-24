import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserService, User, Pending, Status } from './user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <a href="https://coryrylan.com/blog/angular-http-pending-request-pattern">
      <h1>Tutorial: Angular HTTP Pending Request Pattern</h1>
    </a>

    <section *ngIf="user.data | async as user">
      <h3>{{user.name}}</h3>
      <p>Height: {{user.height}}</p>
      <p>Mass: {{user.mass}}</p>
      <p>Homeworld: {{user.homeworld}}</p>
    </section>

    <section [ngSwitch]="user.status | async">
      <span *ngSwitchCase="Status.LOADING">Loading User...</span>
      <span *ngSwitchCase="Status.ERROR">There was an error loading the user.</span>
    </section>
  `,
})
export class App {
  readonly Status = Status;
  readonly user: Pending<User>;

  constructor(private userService: UserService) {
    this.user = this.userService.load(1);
  }
}

bootstrapApplication(App);
