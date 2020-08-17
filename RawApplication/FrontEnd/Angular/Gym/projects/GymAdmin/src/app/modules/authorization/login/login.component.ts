import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../core/services/authentication/authentication.service';
import {Router} from '@angular/router';
import {Credentials} from '../../../shared/models/credentials.model';

@Component({
  selector: 'gym-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../../assets/styles/login.component.scss']
})
export class LoginComponent implements OnInit {

  public credentials: Credentials = new Credentials();
  public errorMsg: string = '';
  public submitted: boolean;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }
  public login(form) {
      this.submitted = true;
      this.errorMsg = '';
      if (!form.valid) {
        return;
      }

      this.authenticationService
        .login(this.credentials)
        .then(() => {
          this.router.navigateByUrl('/dashboard');
        })
        .catch((error) => {
          this.errorMsg = error.message;
        });
    }

}
