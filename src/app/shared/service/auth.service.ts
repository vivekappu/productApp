import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient , private router: Router) { }
  register(user){
    return this.http.post('http://localhost:3000/signup',user);
  }
  login(user){
    return this.http.post('http://localhost:3000/login',user)
  }

  IsloggedIn(){
    return !!localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token')
  }
  logoutUser(){
      localStorage.clear();
      this.router.navigate(['/login']);
  }
}
