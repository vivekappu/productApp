import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   IsloggedIn(){
    return this.authService.IsloggedIn();
  }

  title = 'Product Management';
  links = [
    { path: '',  title: 'Home' , show: 'show'},
    { path: 'addproduct',  title: 'AddProduct', show: (this.IsloggedIn()) ? 'show' : 'hide'},
    { path: 'login' , title: 'login' , show: (!this.IsloggedIn()) ? 'show' : 'hide'},
    { path: 'signup', title: 'signup', show: (!this.IsloggedIn()) ? 'show' : 'hide'},

  ];
  constructor(private authService: AuthService,private router:Router) {
  }
  refresh(): void {
    window.location.reload();
  }
  logoutUser(){
    this.authService.logoutUser();
  }
  ngOnInit(): void {

  }

}
