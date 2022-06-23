import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    nombre: new FormControl('Jairo', Validators.required),
    email: new FormControl('jairo@gmail.com', Validators.required),
    password: new FormControl('admin123', Validators.required),
    password_confirmation: new FormControl('admin123', Validators.required),
  });
  errorStatus: boolean = false;
  errorMsg: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {}

  register(form: FormGroup) {
    try {
      this.authService.singUp(form.value).subscribe((res: any) => {
        console.log(res);
        if (res.estado) {
          this.router.navigate(['login']);
        } else {
          this.errorStatus = true;
          this.errorMsg = 'Error en la creación del usuario';
        }
      });
    } catch (error) {
      this.errorStatus = true;
      this.errorMsg = 'Error en la creación del usuario';
    }
  }
}
