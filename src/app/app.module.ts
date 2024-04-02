import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClientXsrfModule,
  provideHttpClient,
  withFetch
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppErrorsComponent } from './app-errors/app-errors.component';
import {AppInterceptorInterceptor} from "./services/app-interceptor.interceptor";
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    NewProductComponent,
    EditProductComponent,
    DashboardComponent,
    NavbarComponent,
    AppErrorsComponent,
    LoginComponent,
    AdminTemplateComponent,
    NotAuthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientXsrfModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass:AppInterceptorInterceptor , multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
