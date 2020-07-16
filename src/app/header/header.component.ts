import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  IsloggedIn=this.authService.IsloggedIn();
  isCollapsed = false;
  title = 'Product Management';
  links = [
    { path: '',  title: 'Home' , show: 'show'},
    { path: 'addproduct',  title: 'AddProduct', show: (this.authService.IsloggedIn()) ? 'show' : 'hide'},
    { path: 'login' , title: 'login' , show: (!this.authService.IsloggedIn()) ? 'show' : 'hide'},
    { path: 'signup', title: 'signup', show: (!this.authService.IsloggedIn()) ? 'show' : 'hide'},

  ];
  constructor(private authService: AuthService,private router:Router) {
  }
  refresh(): void {
    window.location.reload();
  }
  logoutUser(){
    console.log('logout')
    localStorage.removeItem('token');
    this.router.navigate(['/login']).then(
      () => this.refresh()
    )
  }
  ngOnInit(): void {
  }

}
