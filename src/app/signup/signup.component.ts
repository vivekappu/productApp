import { Component, OnInit } from '@angular/core';
import {AuthService} from '../shared/service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user = {
    lname: '',
    fname: '',
    email: '',
    password: ''
  };
  constructor(private auth: AuthService,private router: Router) { }

  register(){
    this.auth.register(this.user).subscribe(data=> {
      alert(data.message);
      this.router.navigateByUrl('/login');
    },error => alert(error.error.message));
  }
  ngOnInit(): void {
  }

}
