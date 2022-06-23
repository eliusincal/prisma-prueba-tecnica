import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('eliu@gmail.com', Validators.required),
    password: new FormControl('admin123', Validators.required),
  });
  errorStatus: boolean = false;
  errorMsg: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token') || undefined;
    if (
      !this.jwtHelper.isTokenExpired(token) ||
      localStorage.getItem('token')
    ) {
      this.router.navigate(['home']);
    }
  }

  logIn(form: FormGroup) {
    try {
      this.authService.singIng(form.value).subscribe((res: any) => {
        console.log(res);
        if (res.tipo) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('url', res.url);
          localStorage.setItem('usuario', res.usuario);
          this.router.navigate(['home']);
        } else {
          this.errorStatus = true;
          this.errorMsg = 'Email o contraseña incorrecta';
        }
      });
    } catch (error) {
      this.errorStatus = true;
      this.errorMsg = 'Email o contraseña incorrecta';
    }
  }
}
