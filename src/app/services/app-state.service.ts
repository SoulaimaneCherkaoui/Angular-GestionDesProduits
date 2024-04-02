import { Injectable } from '@angular/core';
import {Product} from "../../../Models/product.model";

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  public productsState:any = {
    products : [],
    TotalPages :0,
    PageSize:3,
    currentPage:1,
     keyword  : "",
    TotalCount : 0,
    status : "",
    errorMessage : ""

  }
  public authState:any={
    isAuthenticated :false,
    username:"",
    roles :[],
    token :"",
    status :"",
    errorMessage :"",
    openaiKey:"YOUR API KEY"
  }

  constructor() { }
  public setProductState(state:any):void{
    //recopier les valeurs de pstte et ecraser un valeur avec state
    this.productsState={...this.productsState,...state}
  }
  public setAuthState(state:any){
    this.authState={errorMessage:"",...this.authState, ...state};
  }
}
