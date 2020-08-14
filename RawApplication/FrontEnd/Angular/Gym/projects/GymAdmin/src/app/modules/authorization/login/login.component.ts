import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gym-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string;

  constructor() { }

  ngOnInit(): void {
  }

  loginUser(): void {
    console.log('login User');
  }

}
