import { Injectable } from '@angular/core';
import {SecurityService} from '../../data-services/security/security.service';
import {UsersService} from '../../data-services/users/users.service';
import {EventsHubService} from '../events-hub/events-hub.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string;
  private loggedUser;

  constructor(
    private readonly securityService: SecurityService,
    private readonly userService: UsersService,
    private readonly eventsHubService: EventsHubService
  ) { }

  login(credentials): Promise<any> {
    return new Promise((resolve, reject) => {
      this.securityService.login(credentials).subscribe(
        (result) => {
          this.token = result.token;
          const userId = 1;

          this.userService.getUser(userId).subscribe(
            (user) => {
              this.loggedUser = user;
              this.eventsHubService.setLoggedIn(true);
              resolve(result);
            },
            () => {
              reject({ message: 'user does not exists' });
            }
          );
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
