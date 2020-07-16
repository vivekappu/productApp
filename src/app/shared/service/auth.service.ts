import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient , private router: Router) { }
  register(user){
    return this.http.post('http://localhost:3000/signup',user);
  }
  login(user){
    return this.http.post('http://localhost:3000/login',user)
  }

  IsloggedIn(){
   this.loggedIn=!!localStorage.getItem('token');

    return this.loggedIn;
  }
  getToken(){

    return localStorage.getItem('token')
  }
}
