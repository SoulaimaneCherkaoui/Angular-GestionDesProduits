import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {AppStateService} from "../services/app-state.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard {
  constructor(private appState : AppStateService, private router : Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let authorized=false;
    if(!this.appState.authState.isAuthenticated){
      authorized=false;
    } else {
      for (let role of this.appState.authState.roles){
        console.log(this.appState.authState.roles);
        console.log(route.data['roles']);
        if((route.data['roles'] as Array<string>).includes(role)){
          authorized=true;
          break;
        }
      }
    }
    if(authorized) {
      return true;
    } else {
      this.router.navigateByUrl("/notAuthorized");
      return false;
    }
  }


}
