import { UserService } from '../../shared/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private router: Router, private service: UserService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

     
      
      
    if (this.service.tokenExists() == false) {
      this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url } });
      return false;
    } else {
      let currentRoles =this.service.getDecodedToken().roles;
      if (next.data.roles && next.data.roles.indexOf(currentRoles) === -1) {
        this.router.navigateByUrl('/forbidden');
        return false;
    }

      return true;

    }
  }

}

