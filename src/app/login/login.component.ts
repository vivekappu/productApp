import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: ''
  };
  constructor(private auth: AuthService, private router: Router) { }
  refresh(): void {
    window.location.reload();
  }
  login(){
    this.auth.login(this.user).subscribe(res=>{
      alert(res["message"]);
      localStorage.setItem('token', res["token"]);
      this.router.navigateByUrl('/').then(
        ()=>this.refresh()
      )
    },error => {
      alert(error.error.message);
    });

  }



  ngOnInit(): void {
  }

}
