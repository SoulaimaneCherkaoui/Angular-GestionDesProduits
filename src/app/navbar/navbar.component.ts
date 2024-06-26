import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(public appState:AppStateService,public ls : LoadingService,private router : Router) {
  }
  title : string  = "SoulaimaneApp"
  actions : Array<any> = [
    {title:"Home",route:"/admin/home",icon:"house"},
    {title:"Products",route:"/admin/products",icon:"search"},
    {title:"New Product",route:"/admin/newProduct",icon:"safe"}
  ];
  currentAction :any;

  setCurrentAction(action:any) {
    this.currentAction = action;



  }

  handleLogout() {
this.appState.authState={};
    this.router.navigateByUrl("/login");

  }

  handleLogin() {
    this.router.navigateByUrl("/login");

  }
}
