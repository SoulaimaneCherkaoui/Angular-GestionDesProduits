import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import {Injectable} from "@angular/core";
import {AppStateService} from "./app-state.service";
import {finalize} from "rxjs";
import {LoadingService} from "./loading.service";
@Injectable()
export class AppInterceptorInterceptor implements HttpInterceptor {
  constructor(private appState:AppStateService,private ls :LoadingService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    /*this.appState.setProductState({
      status:"LOADING"
    })*/
    this.ls.showLoadingSpiner();
    let modifiedReq = req.clone({
      headers:req.headers.set("Authorization","Bearer JWT")
    });
    return next.handle(modifiedReq).pipe(
      finalize(()=>{
        /*this.appState.setProductState({
          status:"LOADED"
        })*/
        this.ls.hideLoadingSpiner();
      })
    );
  }
}
