import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
  selector: 'gym-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    console.log('login User');
  }

}
