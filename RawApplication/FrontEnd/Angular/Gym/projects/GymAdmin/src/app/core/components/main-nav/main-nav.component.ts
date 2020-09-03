import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {EventsHubService} from '../../services/events-hub/events-hub.service';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Component({
  selector: 'gym-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit{

  public isLoggedIn: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private evenstHubService: EventsHubService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = false;

    this.evenstHubService.loggedIn$.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  public logout(): void {
    this.authenticationService.logout();
  }
}
