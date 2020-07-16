import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,private router: Router) {
  }
  canActivate( route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    if(this.auth.IsloggedIn()){
      return true;

    }
    this.router.navigateByUrl('/login').then(r => false);


  }

}
