import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {
private isLogged: boolean= false;

constructor(private router: Router, private tokenService: TokenService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.tokenService.getToken()) {
        this.isLogged = true;
        return true;
      }else {
        this.router.navigate(['page-not-found']);
        this.isLogged = false;
        return false;
      }
  }
}