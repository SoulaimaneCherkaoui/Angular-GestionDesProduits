import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
formLogin! : FormGroup;
errorMessage = undefined;
constructor(private fb:FormBuilder,private router:Router,private authService : AuthService) {
}

  ngOnInit(): void {
  this.formLogin=this.fb.group({
    username:this.fb.control(""),
    password:this.fb.control("")
  })
  }

  handleLogin() {
   this.authService.login(this.formLogin.value.username,this.formLogin.value.password)
     .then(resp =>{
       this.router.navigateByUrl("/admin");

     })
     .catch(error=>{
       this.errorMessage=error;

     })


}}
