import { Component } from '@angular/core';

import { UserService, User, Pending, Status } from './user.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  readonly Status = Status;
  readonly user: Pending<User>;

  constructor(private userService: UserService) {
    this.user = this.userService.load(1);
  }
}
