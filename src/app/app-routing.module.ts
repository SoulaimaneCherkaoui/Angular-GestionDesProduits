import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewProductComponent} from "./new-product/new-product.component";
import {ProductsComponent} from "./products/products.component";
import {HomeComponent} from "./home/home.component";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentification.guard";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";
import {AuthorizationGuard} from "./guards/authorization.guard";

const routes: Routes = [{path: "login",component:LoginComponent},

  //important : la classe AuthenticationGuard protege tout lr composant avec childreen, si true tout est bien, sinon il n'a  pas l'acces au childreen
  {path:"admin",component:AdminTemplateComponent,canActivate: [AuthenticationGuard],children:[
      {path: "products",component:ProductsComponent},
      {path: "newProduct",component:NewProductComponent,canActivate: [AuthorizationGuard],data:{roles :'ADMIN'}},
      {path: "home",component:HomeComponent},

      {path: "editProduct/:id",component:EditProductComponent,canActivate: [AuthorizationGuard],data:{roles :'ADMIN'}}
    ]},{path: "notAuthorized",component:NotAuthorizedComponent},

  {path: "",redirectTo:"login",pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
