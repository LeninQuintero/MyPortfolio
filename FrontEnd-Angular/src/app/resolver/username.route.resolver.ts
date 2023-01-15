import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { catchError, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<any> {
    constructor(private userService: UserService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot) {
        const username = route.paramMap.get('username');
        return this.userService.userExist(username).pipe(
            catchError(error => {
                this.router.navigate(['/page-not-found']);
                return of();
            }));
    }
}