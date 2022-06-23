import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'https://candidates-exam.herokuapp.com/api/v1/';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  singIng(user: any) {
    return this.http.post(`${this.URL}/auth/login`, user);
  }

  singUp(new_user: any) {
    return this.http.post(`${this.URL}/usuarios`, new_user);
  }

  isAuht(): boolean {
    const token = localStorage.getItem('token') || undefined;
    if (
      this.jwtHelper.isTokenExpired(token) ||
      !localStorage.getItem('token')
    ) {
      return false;
    }
    return true;
  }

  viewProfile() {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', token);
    return this.http.get(`${this.URL}/usuarios`, { headers: headers });
  }

  uploadCV(cv: File) {
    const url_user = localStorage.getItem('url');
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders()
      .set('Authorization', token);
    const fd = new FormData();
    fd.append('curriculum', cv);
    console.log(cv);
    return this.http
      .post(`${this.URL}usuarios/${url_user}/cargar_cv`, fd, {
        headers: headers,
      });
  }

  verifyCV() {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Authorization', token);
    return this.http.get(`${this.URL}usuarios/mostrar_cv`, { headers: headers });
  }
}
